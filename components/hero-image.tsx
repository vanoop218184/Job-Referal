"use client"

import { motion } from "framer-motion"

export function HeroImage() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute top-0 right-0 w-full h-full optimize-animation"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-blue-300 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-blue-700 font-medium">Professional Network</p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 rounded-full bg-blue-100 optimize-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-blue-200 optimize-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-blue-50 optimize-animation"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      />
    </div>
  )
}
