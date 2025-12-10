import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import projectsRoutes from './routes/projects'
import contactRoutes from './routes/contact'
import adminRoutes from './routes/admin'
import healthRoutes from './routes/health'
import { errorHandler } from './middleware/errorHandler'
import { notFound } from './middleware/notFound'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || ''

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/health', healthRoutes)
app.use('/api/projects', projectsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/admin', adminRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Database connection
function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`)
    console.log(`📍 API Base: http://localhost:${PORT}/api`)
  })
}

if (MONGO_URI) {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB')
      startServer()
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error.message)
      console.log('⚠️  Starting server without database connection...')
      console.log('💡 To connect MongoDB, set MONGO_URI in backend/.env')
      startServer()
    })
} else {
  console.log('⚠️  MONGO_URI not set, starting server without database...')
  console.log('💡 Set MONGO_URI in backend/.env to enable database features')
  startServer()
}

export default app
