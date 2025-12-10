import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import mongoose from 'mongoose'
import { authenticate } from '../middleware/auth'
import { loginRateLimiter } from '../middleware/rateLimiter'
import Project from '../models/Project'
import Contact from '../models/Contact'

const router = Router()

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

// POST /api/admin/login
router.post('/login', loginRateLimiter, async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body)

    const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
    const JWT_SECRET = process.env.JWT_SECRET || ''

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: 'admin', username },
      JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.json({ token, username })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    res.status(500).json({ message: 'Login failed' })
  }
})

// GET /api/admin/metrics - Protected route
router.get('/metrics', authenticate, async (req: Request, res: Response) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      return res.json({
        totalProjects: 0,
        totalContacts: 0,
        totalViews: 0,
        message: 'Database not connected',
      })
    }

    const totalProjects = await Project.countDocuments()
    const totalContacts = await Contact.countDocuments()
    // Placeholder for views - implement analytics tracking if needed
    const totalViews = 0

    res.json({
      totalProjects,
      totalContacts,
      totalViews,
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch metrics' })
  }
})

export default router

