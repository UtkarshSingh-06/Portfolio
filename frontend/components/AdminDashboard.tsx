'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { adminApi } from '@/lib/api'
import { FiLogOut, FiTrendingUp, FiUsers, FiFileText } from 'react-icons/fi'

interface Metrics {
  totalProjects: number
  totalContacts: number
  totalViews: number
}

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchMetrics = async () => {
      const token = localStorage.getItem('admin_token')
      if (!token) {
        router.push('/admin')
        return
      }

      try {
        const response = await adminApi.getMetrics(token)
        setMetrics(response.data)
      } catch (error) {
        console.error('Failed to fetch metrics:', error)
        localStorage.removeItem('admin_token')
        router.push('/admin')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="container-custom section-padding">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container-custom section-padding">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <button onClick={handleLogout} className="btn-secondary inline-flex items-center gap-2">
          <FiLogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total Projects
            </h3>
            <FiFileText className="w-8 h-8 text-primary-orange dark:text-secondary-platinum" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics?.totalProjects || 0}
          </p>
        </div>

        <div className="glass-effect rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total Contacts
            </h3>
            <FiUsers className="w-8 h-8 text-electric-blue" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics?.totalContacts || 0}
          </p>
        </div>

        <div className="glass-effect rounded-lg p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Total Views
            </h3>
            <FiTrendingUp className="w-8 h-8 text-electric-blue" />
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {metrics?.totalViews || 0}
          </p>
        </div>
      </div>
    </div>
  )
}

