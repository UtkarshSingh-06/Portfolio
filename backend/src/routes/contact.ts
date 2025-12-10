import { Router, Request, Response } from 'express'
import { z } from 'zod'
import mongoose from 'mongoose'
import Contact from '../models/Contact'
import { sendEmail } from '../utils/email'
import { contactRateLimiter } from '../middleware/rateLimiter'

const router = Router()

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

router.post('/', contactRateLimiter, async (req: Request, res: Response) => {
  try {
    const validatedData = contactSchema.parse(req.body)

    // Save to database (if connected)
    if (mongoose.connection.readyState === 1) {
      const contact = new Contact(validatedData)
      await contact.save()
    } else {
      console.log('Database not connected, skipping save:', validatedData)
    }

    // Send email notification
    try {
      await sendEmail({
        to: process.env.CONTACT_EMAIL || 'utkarsh.yash77@gmail.com',
        subject: `New Contact Form Submission from ${validatedData.name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message}</p>
        `,
      })
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      success: true,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors,
      })
    }
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
})

export default router
