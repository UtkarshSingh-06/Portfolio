# Quick Start Guide

Get your portfolio up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (free tier works)
- Git

## 5-Minute Setup

### 1. Clone and Install

```bash
git clone https://github.com/UtkarshSingh-06/utkarsh-singh-portfolio.git
cd utkarsh-singh-portfolio
npm install
```

### 2. Configure Backend

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your-secret-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_EMAIL=utkarsh.yash77@gmail.com
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin
```

### 3. Configure Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_ANALYTICS_ID=your-ga-id-optional
```

### 4. Seed Sample Data (Optional)

```bash
cd backend
npm run seed
```

### 5. Start Development Servers

```bash
# From root directory
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Health Check: http://localhost:5000/api/health

## Docker Quick Start

```bash
docker-compose up -d
```

## Next Steps

1. **Add Your Resume**: Place `resume.pdf` in `frontend/public/`
2. **Add Project Images**: Place images in `frontend/public/images/`
3. **Customize Content**: Update components in `frontend/components/`
4. **Deploy**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md)

## Troubleshooting

### MongoDB Connection Issues
- Verify your connection string includes credentials
- Check network access in MongoDB Atlas (add your IP)

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

### Email Not Sending
- Use Gmail App Password (not regular password)
- Enable "Less secure app access" or use OAuth2

## Need Help?

- Check [README.md](./README.md) for detailed documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment guides
- Open an issue on GitHub

