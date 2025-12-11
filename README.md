# Utkarsh Singh Portfolio

> Personal portfolio for Utkarsh Singh — Software Developer, AI & Cloud enthusiast. Full-stack (MERN) production app ready for deployment.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/UtkarshSingh-06/utkarsh-singh-portfolio)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://hub.docker.com/)

## 🚀 Project Overview

A modern, performant, and accessible personal portfolio website built with Next.js (App Router), Express.js, MongoDB, and deployed on Vercel (frontend) and AWS (backend). Features include smooth animations, dark mode, SEO optimization, and a complete admin panel.

### Tech Stack

**Frontend:**
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer (Email)

**DevOps:**
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Vercel (Frontend Deployment)
- AWS ECS/Elastic Beanstalk (Backend Deployment)

**Testing:**
- Jest
- React Testing Library
- Supertest

**Code Quality:**
- ESLint
- Prettier
- Husky (Pre-commit hooks)

## 📋 Features

- ✨ Modern, responsive UI with dark mode
- 🎨 Smooth animations with Framer Motion
- 📱 Mobile-first responsive design
- ♿ Accessibility optimized (WCAG 2.1 AA)
- 🔍 SEO optimized (meta tags, Open Graph, sitemap)
- 📊 Google Analytics integration
- 🔐 Admin panel with JWT authentication
- 📧 Contact form with email notifications
- 🧪 Comprehensive test coverage
- 🐳 Docker containerization
- 🚀 One-click deployment ready

## 🏗️ Project Structure

```
utkarsh-singh-portfolio/
├── frontend/          # Next.js application
│   ├── app/          # App router pages
│   ├── components/   # React components
│   ├── lib/          # Utilities and helpers
│   └── public/       # Static assets
├── backend/          # Express API
│   ├── routes/       # API routes
│   ├── models/       # MongoDB models
│   ├── middleware/   # Express middleware
│   └── utils/        # Utilities
├── .github/          # GitHub Actions workflows
├── docker-compose.yml
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB Atlas account (or local MongoDB)
- Docker (optional, for containerized development)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/UtkarshSingh-06/utkarsh-singh-portfolio.git
   cd utkarsh-singh-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in `frontend/`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_ANALYTICS_ID=your-ga-id
   ```
   
   Create `.env` in `backend/`:
   ```env
   PORT=5000
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret-key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   CONTACT_EMAIL=utkarsh.yash77@gmail.com
   NODE_ENV=development
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin
   ```

4. **Seed sample data (optional)**
   ```bash
   cd backend
   npm run seed
   ```

5. **Run development servers**
   ```bash
   npm run dev
   ```
   
   Frontend: http://localhost:3000
   Backend: http://localhost:5000

### Docker Development

```bash
docker-compose up -d
```

This will start both frontend and backend in containers.

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
npm test
```

### Run All Tests
```bash
npm test
```

## 🏗️ Building for Production

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
npm run build
```

## 🚀 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

**Or use Vercel CLI:**
```bash
cd frontend
vercel
```

### Backend (AWS)

#### Option 1: AWS ECS with Docker

1. Build and push Docker image:
   ```bash
   cd backend
   ./deploy.sh
   ```

2. Create ECS cluster and task definition
3. Configure environment variables in ECS
4. Deploy service

#### Option 2: AWS Elastic Beanstalk

1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Create environment: `eb create`
4. Deploy: `eb deploy`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📝 Environment Variables

See `.env.example` files in `frontend/` and `backend/` directories for all required variables.

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

## 👤 Author

**Utkarsh Singh**
- Email: utkarsh.yash77@gmail.com
- LinkedIn: [linkedin.com/in/utkarsh-singh06](https://www.linkedin.com/in/utkarsh-singh06)
- GitHub: [github.com/UtkarshSingh-06](https://github.com/UtkarshSingh-06)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio templates
- Next.js and React communities

---

**Note:** This portfolio uses content from Utkarsh Singh's résumé. All dates, positions, and descriptions are accurate as of the last update.
