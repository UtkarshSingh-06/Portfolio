# Deployment Guide

This guide covers deployment options for both frontend and backend of the portfolio application.

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository connected to Vercel

### Steps

1. **Install Vercel CLI** (optional, for local deployment)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Configure environment variables:
     - `NEXT_PUBLIC_API_URL` - Your backend API URL
     - `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics ID (optional)
   - Click "Deploy"

3. **Deploy via CLI**
   ```bash
   cd frontend
   vercel
   ```

4. **Automatic Deployment**
   - The GitHub Actions workflow (`deploy-frontend.yml`) will automatically deploy on push to `main` branch
   - Ensure `VERCEL_TOKEN` is set in GitHub Secrets

### Environment Variables

Add these in Vercel dashboard:
- `NEXT_PUBLIC_API_URL` - Backend API URL (e.g., `https://api.utkarshsingh.dev`)
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics tracking ID (optional)

## Backend Deployment (AWS)

### Option 1: AWS ECS with Docker

#### Prerequisites
- AWS account
- AWS CLI configured
- Docker Hub account (for image registry)

#### Steps

1. **Build and Push Docker Image**
   ```bash
   cd backend
   ./deploy.sh
   ```
   Or manually:
   ```bash
   docker build -t your-docker-username/portfolio-backend:latest .
   docker push your-docker-username/portfolio-backend:latest
   ```

2. **Create ECS Cluster**
   ```bash
   aws ecs create-cluster --cluster-name portfolio-cluster
   ```

3. **Create Task Definition**
   Create `task-definition.json`:
   ```json
   {
     "family": "portfolio-backend",
     "networkMode": "awsvpc",
     "requiresCompatibilities": ["FARGATE"],
     "cpu": "256",
     "memory": "512",
     "containerDefinitions": [
       {
         "name": "portfolio-backend",
         "image": "your-docker-username/portfolio-backend:latest",
         "portMappings": [
           {
             "containerPort": 5000,
             "protocol": "tcp"
           }
         ],
         "environment": [
           {
             "name": "NODE_ENV",
             "value": "production"
           },
           {
             "name": "PORT",
             "value": "5000"
           }
         ],
         "secrets": [
           {
             "name": "MONGO_URI",
             "valueFrom": "arn:aws:secretsmanager:region:account:secret:portfolio/mongo-uri"
           },
           {
             "name": "JWT_SECRET",
             "valueFrom": "arn:aws:secretsmanager:region:account:secret:portfolio/jwt-secret"
           }
         ],
         "logConfiguration": {
           "logDriver": "awslogs",
           "options": {
             "awslogs-group": "/ecs/portfolio-backend",
             "awslogs-region": "us-east-1",
             "awslogs-stream-prefix": "ecs"
           }
         }
       }
     ]
   }
   ```

4. **Register Task Definition**
   ```bash
   aws ecs register-task-definition --cli-input-json file://task-definition.json
   ```

5. **Create ECS Service**
   ```bash
   aws ecs create-service \
     --cluster portfolio-cluster \
     --service-name portfolio-backend \
     --task-definition portfolio-backend \
     --desired-count 1 \
     --launch-type FARGATE \
     --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=ENABLED}"
   ```

6. **Set up Application Load Balancer** (optional but recommended)
   - Create ALB in EC2 console
   - Create target group pointing to ECS service
   - Configure health check on `/api/health`

### Option 2: AWS Elastic Beanstalk

#### Prerequisites
- AWS account
- EB CLI installed: `pip install awsebcli`

#### Steps

1. **Initialize Elastic Beanstalk**
   ```bash
   cd backend
   eb init -p docker portfolio-backend --region us-east-1
   ```

2. **Create Environment**
   ```bash
   eb create portfolio-backend-env
   ```

3. **Set Environment Variables**
   ```bash
   eb setenv MONGO_URI=your-mongo-uri \
            JWT_SECRET=your-jwt-secret \
            NODE_ENV=production \
            PORT=5000
   ```

4. **Deploy**
   ```bash
   eb deploy
   ```

5. **Open Application**
   ```bash
   eb open
   ```

### Option 3: AWS EC2 with Docker Compose

1. **Launch EC2 Instance**
   - Use Ubuntu 22.04 LTS
   - Security group: Allow ports 22, 80, 443, 5000

2. **SSH into Instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Docker and Docker Compose**
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo usermod -aG docker ubuntu
   ```

4. **Clone Repository**
   ```bash
   git clone https://github.com/UtkarshSingh-06/utkarsh-singh-portfolio.git
   cd utkarsh-singh-portfolio
   ```

5. **Configure Environment**
   ```bash
   cd backend
   cp .env.example .env
   nano .env  # Edit with your values
   ```

6. **Run with Docker Compose**
   ```bash
   cd ..
   docker-compose up -d
   ```

7. **Set up Nginx Reverse Proxy** (optional)
   ```bash
   sudo apt install nginx -y
   sudo nano /etc/nginx/sites-available/portfolio
   ```
   
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name api.utkarshsingh.dev;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

## Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create free cluster

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

3. **Configure Network Access**
   - Add your IP address or `0.0.0.0/0` for all IPs (not recommended for production)

4. **Set Environment Variable**
   - Add `MONGO_URI` to your backend environment variables

## Environment Variables Summary

### Frontend (Vercel)
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics ID (optional)

### Backend (AWS)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (production/development)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `SMTP_HOST` - SMTP server host
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password
- `CONTACT_EMAIL` - Email to receive contact form submissions
- `ADMIN_USERNAME` - Admin panel username
- `ADMIN_PASSWORD` - Admin panel password

## CI/CD Setup

### GitHub Secrets Required

For frontend deployment:
- `VERCEL_TOKEN` - Vercel API token

For backend deployment:
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password
- `AWS_ACCESS_KEY_ID` - AWS access key
- `AWS_SECRET_ACCESS_KEY` - AWS secret key
- `AWS_REGION` - AWS region (e.g., us-east-1)
- `AWS_ECS_CLUSTER` - ECS cluster name
- `AWS_ECS_SERVICE` - ECS service name

## Troubleshooting

### Frontend Issues
- **Build fails**: Check Node.js version (requires 18+)
- **API calls fail**: Verify `NEXT_PUBLIC_API_URL` is set correctly
- **Images not loading**: Check image paths and Next.js image configuration

### Backend Issues
- **MongoDB connection fails**: Verify `MONGO_URI` and network access
- **Email not sending**: Check SMTP credentials and firewall rules
- **Docker build fails**: Ensure Dockerfile syntax is correct
- **ECS service not starting**: Check CloudWatch logs and task definition

### General
- Check logs: `docker logs portfolio-backend` or AWS CloudWatch
- Verify environment variables are set correctly
- Ensure security groups allow necessary ports
- Check DNS configuration for custom domains

## Monitoring

### Recommended Tools
- **Vercel Analytics** - Frontend performance
- **AWS CloudWatch** - Backend logs and metrics
- **MongoDB Atlas Monitoring** - Database performance
- **Google Analytics** - User analytics

## Security Checklist

- [ ] Use strong `JWT_SECRET` in production
- [ ] Change default admin credentials
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Restrict MongoDB network access
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Monitor logs for suspicious activity

