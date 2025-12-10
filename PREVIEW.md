# 🚀 Portfolio Project - Live Preview

## ✅ Project Status: RUNNING

Both frontend and backend servers are now running!

## 🌐 Access Points

### Frontend (Next.js)
- **URL**: http://localhost:3000
- **Status**: ✅ Running
- **Features Available**:
  - Home page with Hero section
  - About section
  - Skills showcase
  - Experience timeline
  - Projects gallery
  - Contact form
  - Resume download page
  - Admin panel (at /admin)

### Backend (Express API)
- **URL**: http://localhost:5000
- **Status**: ✅ Running
- **API Endpoints**:
  - `GET /api/health` - Health check
  - `GET /api/projects` - Get all projects
  - `GET /api/projects/:id` - Get single project
  - `POST /api/contact` - Submit contact form
  - `POST /api/admin/login` - Admin login
  - `GET /api/admin/metrics` - Admin metrics (protected)

## 📋 Available Pages

1. **Home** (`/`) - Landing page with all sections
2. **About** (`/about`) - About page with skills and experience
3. **Projects** (`/projects`) - Projects showcase page
4. **Contact** (`/contact`) - Contact form page
5. **Resume** (`/resume`) - Resume download page
6. **Admin** (`/admin`) - Admin dashboard (login required)

## 🎨 Features

### ✅ Implemented
- Modern, responsive UI with dark mode
- Smooth animations with Framer Motion
- SEO optimization (meta tags, sitemap, robots.txt)
- Google Analytics integration ready
- Contact form with email notifications
- Admin panel with JWT authentication
- Project showcase with API integration
- Resume download functionality
- Accessibility features (WCAG 2.1 AA)

### 🔧 Configuration

**Backend Environment** (`backend/.env`):
- MongoDB connection (optional - works without DB)
- JWT secret for authentication
- SMTP settings for email (optional)
- Admin credentials

**Frontend Environment** (`frontend/.env.local`):
- API URL: http://localhost:5000
- Analytics ID (optional)

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Get Projects
```bash
curl http://localhost:5000/api/projects
```

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

## 🎯 Next Steps

1. **Customize Content**:
   - Update `frontend/components/About.tsx` with your bio
   - Update `frontend/components/Skills.tsx` with your skills
   - Update `frontend/components/Experience.tsx` with your experience
   - Add your resume PDF to `frontend/public/resume.pdf`

2. **Add Projects**:
   - Projects are loaded from the API
   - Without MongoDB, default projects are shown
   - To add projects, set up MongoDB and use the seed script:
     ```bash
     cd backend
     npm run seed
     ```

3. **Configure Email**:
   - Update SMTP settings in `backend/.env`
   - Use Gmail App Password for Gmail SMTP

4. **Deploy**:
   - Frontend: Deploy to Vercel (see DEPLOYMENT.md)
   - Backend: Deploy to AWS (see DEPLOYMENT.md)

## 🐛 Troubleshooting

### Backend not starting?
- Check if port 5000 is available
- Verify `backend/.env` exists
- Check MongoDB connection (optional)

### Frontend not starting?
- Check if port 3000 is available
- Verify `frontend/.env.local` exists
- Run `npm install` in frontend directory

### API calls failing?
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend/.env.local
- Verify CORS is enabled in backend

## 📸 Preview Screenshots

The portfolio includes:
- **Hero Section**: Animated typing effect with role rotation
- **About Section**: Personal introduction
- **Skills Section**: Categorized skill badges
- **Experience Section**: Timeline of work experience
- **Projects Section**: Featured projects with tech stack
- **Contact Section**: Working contact form
- **Dark Mode**: Toggle between light/dark themes

## 🎉 Enjoy Your Portfolio!

Your portfolio is now running locally. Open http://localhost:3000 in your browser to see it in action!

---

**Note**: The project works without MongoDB for development. To enable full database features, set up MongoDB Atlas or local MongoDB and update `MONGO_URI` in `backend/.env`.

