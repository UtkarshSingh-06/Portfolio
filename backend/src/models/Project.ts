import mongoose, { Schema, Document } from 'mongoose'

export interface IProject extends Document {
  title: string
  description: string
  summary: string
  techStack: string[]
  image?: string
  githubUrl?: string
  demoUrl?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    demoUrl: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IProject>('Project', ProjectSchema)

