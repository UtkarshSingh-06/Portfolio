'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { FiMail, FiLinkedin, FiGithub, FiSend } from 'react-icons/fi'
import { contactApi } from '@/lib/api'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:utkarsh.yash77@gmail.com',
    icon: FiMail,
    label: 'utkarsh.yash77@gmail.com',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/utkarsh-singh06',
    icon: FiLinkedin,
    label: 'linkedin.com/in/utkarsh-singh06',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/UtkarshSingh-06',
    icon: FiGithub,
    label: 'github.com/UtkarshSingh-06',
  },
]

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      await contactApi.send(data)
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.',
      })
      reset()
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message:
          error.response?.data?.message ||
          'Failed to send message. Please try again later.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-gradient-to-br from-secondary-platinum via-secondary-100 to-primary-50 dark:from-accent-moss dark:via-accent-600 dark:to-accent-700">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-gradient-contact">
            Get In Touch
          </h2>
          <p className="text-center text-accent-600 dark:text-secondary-300 mb-12">
            Have a project in mind or want to collaborate? I'd love to hear from
            you!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-secondary-platinum dark:border-accent-600 bg-secondary-platinum dark:bg-accent-moss text-accent-moss dark:text-secondary-platinum focus:outline-none focus:ring-2 focus:ring-primary-orange dark:focus:ring-secondary-platinum focus:border-transparent"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-secondary-platinum dark:border-accent-600 bg-secondary-platinum dark:bg-accent-moss text-accent-moss dark:text-secondary-platinum focus:outline-none focus:ring-2 focus:ring-primary-orange dark:focus:ring-secondary-platinum focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    {...register('message')}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent resize-none"
                    placeholder="Your message..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-300">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitStatus.type && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitStatus.type === 'success'
                        ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-6 text-accent-moss dark:text-secondary-platinum">
                  Let's Connect
                </h3>
                <p className="text-accent-600 dark:text-secondary-300 mb-8">
                  Feel free to reach out through any of these channels. I'm
                  always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision.
                </p>
              </div>

              <div className="space-y-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                      className="flex items-center gap-4 p-4 rounded-lg glass-effect card-hover group"
                    >
                      <div className="p-3 rounded-lg bg-primary-orange/10 text-primary-orange dark:bg-secondary-platinum/10 dark:text-secondary-platinum group-hover:bg-primary-orange dark:group-hover:bg-secondary-platinum group-hover:text-white transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-accent-moss dark:text-secondary-platinum">
                          {link.name}
                        </p>
                        <p className="text-sm text-accent-600 dark:text-secondary-300">
                          {link.label}
                        </p>
                      </div>
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

