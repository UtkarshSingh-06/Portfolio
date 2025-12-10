import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const projectsApi = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
}

export const contactApi = {
  send: (data: {
    name: string
    email: string
    message: string
  }) => api.post('/contact', data),
}

export const adminApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/admin/login', credentials),
  getMetrics: (token: string) =>
    api.get('/admin/metrics', {
      headers: { Authorization: `Bearer ${token}` },
    }),
}

export default api

