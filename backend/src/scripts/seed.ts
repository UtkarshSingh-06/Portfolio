import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Project from '../models/Project'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

const sampleProjects = [
  {
    title: 'Stock Market Forecasting & Visualization Web App',
    description:
      'A comprehensive web application for stock market analysis and forecasting using machine learning algorithms.',
    summary:
      'Built a full-stack application that predicts stock prices using time series analysis and provides interactive visualizations. Features include real-time data fetching, historical analysis, and predictive modeling.',
    techStack: ['Python', 'React', 'Node.js', 'TensorFlow', 'MongoDB', 'Chart.js'],
    githubUrl: 'https://github.com/UtkarshSingh-06/stock-forecasting',
    demoUrl: 'https://stock-forecast-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Simple Paintball Plugin',
    description:
      'A Minecraft plugin that adds paintball functionality with custom game modes and team management.',
    summary:
      'Developed a feature-rich Minecraft plugin using Java and Bukkit API. Includes custom game mechanics, scoreboard integration, and configurable settings.',
    techStack: ['Java', 'Bukkit API', 'Maven', 'MySQL'],
    githubUrl: 'https://github.com/UtkarshSingh-06/paintball-plugin',
    featured: true,
  },
]

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️  Cleared existing projects')

    // Insert sample projects
    await Project.insertMany(sampleProjects)
    console.log(`✅ Seeded ${sampleProjects.length} projects`)

    await mongoose.connection.close()
    console.log('✅ Seeding complete')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding failed:', error)
    process.exit(1)
  }
}

seed()

