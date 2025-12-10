import request from 'supertest'
import app from '../../server'
import mongoose from 'mongoose'

describe('Admin API', () => {
  beforeAll(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-portfolio')
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  describe('POST /api/admin/login', () => {
    it('should return 401 for invalid credentials', async () => {
      const res = await request(app).post('/api/admin/login').send({
        username: 'wrong',
        password: 'wrong',
      })
      expect(res.status).toBe(401)
    })

    it('should return token for valid credentials', async () => {
      const res = await request(app).post('/api/admin/login').send({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin',
      })
      expect(res.status).toBe(200)
      expect(res.body.token).toBeDefined()
    })
  })

  describe('GET /api/admin/metrics', () => {
    it('should return 401 without token', async () => {
      const res = await request(app).get('/api/admin/metrics')
      expect(res.status).toBe(401)
    })

    it('should return metrics with valid token', async () => {
      // First login to get token
      const loginRes = await request(app).post('/api/admin/login').send({
        username: process.env.ADMIN_USERNAME || 'admin',
        password: process.env.ADMIN_PASSWORD || 'admin',
      })

      const token = loginRes.body.token

      const res = await request(app)
        .get('/api/admin/metrics')
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('totalProjects')
      expect(res.body).toHaveProperty('totalContacts')
      expect(res.body).toHaveProperty('totalViews')
    })
  })
})

