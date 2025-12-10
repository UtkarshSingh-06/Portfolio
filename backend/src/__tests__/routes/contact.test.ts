import request from 'supertest'
import app from '../../server'
import Contact from '../../models/Contact'
import mongoose from 'mongoose'

describe('Contact API', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-portfolio')
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Contact.deleteMany({})
  })

  describe('POST /api/contact', () => {
    it('should validate required fields', async () => {
      const res = await request(app).post('/api/contact').send({})
      expect(res.status).toBe(400)
    })

    it('should create contact submission', async () => {
      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message with enough characters',
      }

      const res = await request(app).post('/api/contact').send(contactData)
      expect(res.status).toBe(201)
      expect(res.body.success).toBe(true)

      const contact = await Contact.findOne({ email: contactData.email })
      expect(contact).toBeTruthy()
      expect(contact?.name).toBe(contactData.name)
    })

    it('should validate email format', async () => {
      const res = await request(app).post('/api/contact').send({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Valid message with enough characters',
      })
      expect(res.status).toBe(400)
    })
  })
})

