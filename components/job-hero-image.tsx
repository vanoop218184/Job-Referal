"use client"

import { motion } from "framer-motion"
import { Briefcase, Users, Building, CheckCircle, Award, Star } from "lucide-react"
import { useEffect, useState } from "react"

interface JobHeroImageProps {
  imageUrl?: string
  altText?: string
}

const JobHeroImage = ({ imageUrl, altText = "Job interview illustration" }: JobHeroImageProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-gradient-to-br from-professional-50 to-primary-50 dark:from-gray-800 dark:to-primary-900/30">
      {/* Background network effect */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-300 dark:text-primary-700"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Office building */}
      <motion.div
        className="absolute left-[10%] top-[15%] w-[30%] h-[70%] bg-gradient-to-b from-professional-200 to-professional-300 dark:from-professional-700 dark:to-professional-800 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Building windows */}
        <div className="grid grid-cols-3 gap-2 p-2 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="bg-primary-100 dark:bg-primary-900 rounded"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Interview desk */}
      <motion.div
        className="absolute left-[45%] top-[60%] w-[40%] h-[15%] bg-gradient-to-r from-professional-300 to-professional-400 dark:from-professional-600 dark:to-professional-700 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      {/* Interviewer silhouette */}
      <motion.div
        className="absolute left-[50%] top-[40%] w-[10%] h-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="w-full h-[40%] bg-professional-700 dark:bg-professional-300 rounded-full" />
        <div className="w-[60%] h-[60%] mx-auto bg-professional-700 dark:bg-professional-300 rounded-t-lg" />
        <motion.div
          className="absolute left-[80%] top-[50%] w-[60%] h-[10%] bg-professional-700 dark:bg-professional-300 rounded-full origin-left"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Job seeker silhouette */}
      <motion.div
        className="absolute left-[70%] top-[40%] w-[10%] h-[25%]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="w-full h-[40%] bg-primary-600 dark:bg-primary-400 rounded-full" />
        <div className="w-[60%] h-[60%] mx-auto bg-primary-600 dark:bg-primary-400 rounded-t-lg" />
        <motion.div
          className="absolute right-[80%] top-[50%] w-[60%] h-[10%] bg-primary-600 dark:bg-primary-400 rounded-full origin-right"
          animate={{ rotate: [0, -15, 0] }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
      </motion.div>

      {/* Floating resume */}
      <motion.div
        className="absolute left-[20%] top-[30%] w-[15%] h-[20%] bg-white dark:bg-gray-800 rounded shadow-lg p-2"
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="w-full h-[10%] bg-primary-200 dark:bg-primary-700 mb-2 rounded" />
        <div className="w-[80%] h-[10%] bg-professional-200 dark:bg-professional-700 mb-2 rounded" />
        <div className="w-full h-[10%] bg-professional-200 dark:bg-professional-700 mb-2 rounded" />
        <div className="w-[60%] h-[10%] bg-professional-200 dark:bg-professional-700 rounded" />
      </motion.div>

      {/* Floating job application */}
      <motion.div
        className="absolute right-[15%] top-[20%] w-[15%] h-[20%] bg-white dark:bg-gray-800 rounded shadow-lg p-2 rotate-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="w-full h-[10%] bg-success-200 dark:bg-success-700 mb-2 rounded" />
        <div className="w-[70%] h-[10%] bg-professional-200 dark:bg-professional-700 mb-2 rounded" />
        <div className="w-full h-[10%] bg-professional-200 dark:bg-professional-700 mb-2 rounded" />
        <div className="w-[80%] h-[10%] bg-professional-200 dark:bg-professional-700 rounded" />
      </motion.div>

      {/* "We're Hiring!" badge */}
      <motion.div
        className="absolute left-[15%] top-[10%] bg-primary-600 dark:bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: [1, 1.05, 1] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.8 },
          scale: { duration: 2, repeat: Number.POSITIVE_INFINITY },
        }}
      >
        We're Hiring!
      </motion.div>

      {/* "Successful Referral!" badge */}
      <motion.div
        className="absolute right-[20%] top-[45%] bg-success-600 dark:bg-success-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 1.2,
        }}
      >
        Successful Referral!
      </motion.div>

      {/* Floating icons */}
      {[
        { Icon: Briefcase, color: "text-primary-600 dark:text-primary-400", x: "75%", y: "15%", delay: 0.9 },
        { Icon: Users, color: "text-success-600 dark:text-success-400", x: "85%", y: "70%", delay: 1.0 },
        { Icon: Building, color: "text-professional-600 dark:text-professional-400", x: "25%", y: "70%", delay: 1.1 },
        { Icon: CheckCircle, color: "text-success-600 dark:text-success-400", x: "40%", y: "20%", delay: 1.2 },
        { Icon: Award, color: "text-accent-600 dark:text-accent-400", x: "60%", y: "75%", delay: 1.3 },
        { Icon: Star, color: "text-primary-600 dark:text-primary-400", x: "10%", y: "40%", delay: 1.4 },
      ].map((item, index) => (
        <motion.div
          key={index}
          className={`absolute ${item.color} bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg`}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: item.delay },
            scale: { duration: 0.5, delay: item.delay },
            y: { duration: 3 + index, repeat: Number.POSITIVE_INFINITY, delay: item.delay },
          }}
        >
          <item.Icon className="h-6 w-6" />
        </motion.div>
      ))}

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <g className="text-primary-300 dark:text-primary-700" strokeWidth="1" stroke="currentColor" fill="none">
          {[
            { x1: "20%", y1: "40%", x2: "50%", y2: "50%", delay: 1.5 },
            { x1: "70%", y1: "50%", x2: "85%", y2: "70%", delay: 1.6 },
            { x1: "75%", y1: "15%", x2: "70%", y2: "40%", delay: 1.7 },
            { x1: "25%", y1: "70%", x2: "50%", y2: "50%", delay: 1.8 },
            { x1: "40%", y1: "20%", x2: "50%", y2: "40%", delay: 1.9 },
            { x1: "60%", y1: "75%", x2: "70%", y2: "50%", delay: 2.0 },
          ].map((line, index) => (
            <motion.line
              key={index}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: line.delay }}
              strokeDasharray="5,5"
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

export default JobHeroImage
