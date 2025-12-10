'use client'

import { motion } from 'framer-motion'
import SplitText from './animations/SplitText'
import BlurText from './animations/BlurText'

export default function About() {
  return (
    <section
      id="about"
      className="section-padding bg-gradient-to-br from-secondary-platinum via-secondary-100 to-secondary-50 dark:from-accent-moss dark:via-accent-600 dark:to-accent-700"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gradient-about">
            <SplitText>About Me</SplitText>
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <BlurText className="text-lg text-accent-moss dark:text-secondary-platinum leading-relaxed mb-6">
              I'm a passionate Software Developer with a strong interest in AI
              and Cloud technologies. I love building modern web applications
              that solve real-world problems and create meaningful user
              experiences. My journey in tech has been driven by curiosity and a
              desire to continuously learn and grow.
            </BlurText>
            <BlurText className="text-lg text-accent-moss dark:text-secondary-platinum leading-relaxed mb-6">
              Currently, I'm focused on exploring the intersection of AI and web
              development, working on projects that leverage machine learning and
              cloud-native architectures. I enjoy collaborating with teams,
              contributing to open-source projects, and sharing knowledge with
              the developer community.
            </BlurText>
            <BlurText className="text-lg text-accent-moss dark:text-secondary-platinum leading-relaxed">
              When I'm not coding, you can find me reading tech blogs, attending
              meetups, or working on side projects that push the boundaries of
              what's possible with modern web technologies. 🚀
            </BlurText>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
