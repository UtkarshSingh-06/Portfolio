import { Router, Request, Response } from 'express'
import mongoose from 'mongoose'
import Project from '../models/Project'

const router = Router()

// GET /api/projects - Get all projects
router.get('/', async (req: Request, res: Response) => {
  try {
    // Check if mongoose is connected
    if (mongoose.connection.readyState !== 1) {
      // Return default projects if DB not connected
      return res.json([
        {
          _id: '1',
          title: 'Stock Market Forecasting & Visualization Web App',
          description:
            'A comprehensive web application for stock market analysis and forecasting using machine learning algorithms.',
          summary:
            'Built a full-stack application that predicts stock prices using time series analysis and provides interactive visualizations.',
          techStack: ['Python', 'React', 'Node.js', 'TensorFlow', 'MongoDB', 'Chart.js'],
          githubUrl: 'https://github.com/UtkarshSingh-06/stock-forecasting',
          demoUrl: 'https://stock-forecast-demo.vercel.app',
          featured: true,
        },
        {
          _id: '2',
          title: 'Simple Paintball Plugin',
          description:
            'A Minecraft plugin that adds paintball functionality with custom game modes and team management.',
          summary:
            'Developed a feature-rich Minecraft plugin using Java and Bukkit API. Includes custom game mechanics and scoreboard integration.',
          techStack: ['Java', 'Bukkit API', 'Maven', 'MySQL'],
          githubUrl: 'https://github.com/UtkarshSingh-06/paintball-plugin',
          featured: true,
        },
      ])
    }
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

// GET /api/projects/:id - Get single project
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    res.json(project)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch project' })
  }
})

export default router

