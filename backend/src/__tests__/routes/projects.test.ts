import request from 'supertest'
import app from '../../server'
import Project from '../../models/Project'
import mongoose from 'mongoose'

describe('Projects API', () => {
  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test-portfolio')
    }
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Project.deleteMany({})
  })

  describe('GET /api/projects', () => {
    it('should return empty array when no projects exist', async () => {
      const res = await request(app).get('/api/projects')
      expect(res.status).toBe(200)
      expect(res.body).toEqual([])
    })

    it('should return all projects', async () => {
      const project = new Project({
        title: 'Test Project',
        description: 'Test Description',
        summary: 'Test Summary',
        techStack: ['React', 'Node.js'],
        featured: true,
      })
      await project.save()

      const res = await request(app).get('/api/projects')
      expect(res.status).toBe(200)
      expect(res.body).toHaveLength(1)
      expect(res.body[0].title).toBe('Test Project')
    })
  })

  describe('GET /api/projects/:id', () => {
    it('should return 404 for non-existent project', async () => {
      const fakeId = new mongoose.Types.ObjectId()
      const res = await request(app).get(`/api/projects/${fakeId}`)
      expect(res.status).toBe(404)
    })

    it('should return project by id', async () => {
      const project = new Project({
        title: 'Test Project',
        description: 'Test Description',
        summary: 'Test Summary',
        techStack: ['React'],
        featured: true,
      })
      await project.save()

      const res = await request(app).get(`/api/projects/${project._id}`)
      expect(res.status).toBe(200)
      expect(res.body.title).toBe('Test Project')
    })
  })
})

