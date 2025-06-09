"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Building, MapPin, DollarSign, Briefcase, Users, Star, MessageCircle } from "lucide-react"

const jobCards = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    salary: "₹15L - ₹25L",
    referrer: "Priya Sharma",
    connections: 15,
    rating: 4.9,
    invitation: "Join our innovative team building next-gen solutions!",
  },
  {
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Mumbai, Maharashtra",
    salary: "₹12L - ₹20L",
    referrer: "Arjun Patel",
    connections: 23,
    rating: 4.8,
    invitation: "Shape the future of our product roadmap!",
  },
  {
    title: "Data Scientist",
    company: "DataFlow Corp",
    location: "Hyderabad, Telangana",
    salary: "₹10L - ₹18L",
    referrer: "Sneha Reddy",
    connections: 18,
    rating: 4.7,
    invitation: "Unlock insights from massive datasets!",
  },
  {
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Pune, Maharashtra",
    salary: "₹8L - ₹15L",
    referrer: "Rahul Kumar",
    connections: 12,
    rating: 4.9,
    invitation: "Design experiences that users love!",
  },
  {
    title: "DevOps Engineer",
    company: "CloudTech India",
    location: "Chennai, Tamil Nadu",
    salary: "₹12L - ₹22L",
    referrer: "Kavya Nair",
    connections: 20,
    rating: 4.8,
    invitation: "Scale infrastructure for millions of users!",
  },
  {
    title: "Marketing Director",
    company: "GrowthCo",
    location: "Delhi, NCR",
    salary: "₹10L - ₹18L",
    referrer: "Amit Singh",
    connections: 25,
    rating: 4.6,
    invitation: "Drive growth and brand awareness!",
  },
]

export function FloatingJobCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  // Define specific positions for each card to prevent overlap
  const cardPositions = [
    { x: 5, y: 10, rotation: -2 },
    { x: 35, y: 5, rotation: 3 },
    { x: 65, y: 15, rotation: -1 },
    { x: 10, y: 45, rotation: 2 },
    { x: 40, y: 50, rotation: -3 },
    { x: 70, y: 40, rotation: 1 },
  ]

  // Different animation patterns for each card
  const getAnimationPattern = (index: number) => {
    const patterns = [
      // Gentle vertical float
      {
        y: [0, -15, 0],
        rotate: [-2, 1, -2],
        duration: 4,
      },
      // Diagonal movement
      {
        y: [0, -10, 0],
        x: [0, 5, 0],
        rotate: [3, -1, 3],
        duration: 5,
      },
      // Figure-8 pattern
      {
        y: [0, -12, 0, -8, 0],
        x: [0, 3, 0, -3, 0],
        rotate: [-1, 2, -1, 1, -1],
        duration: 6,
      },
      // Circular motion
      {
        y: [0, -8, -16, -8, 0],
        x: [0, 8, 0, -8, 0],
        rotate: [2, 0, -2, 0, 2],
        duration: 7,
      },
      // Pendulum swing
      {
        y: [0, -10, 0],
        rotate: [-3, 3, -3],
        duration: 4.5,
      },
      // Spiral motion
      {
        y: [0, -20, 0],
        x: [0, 10, 0],
        rotate: [1, 5, 1],
        duration: 5.5,
      },
    ]
    return patterns[index % patterns.length]
  }

  return (
    <div ref={containerRef} className="relative h-[700px] w-full overflow-hidden">
      {/* Enhanced 3D Background elements with better visibility */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`bg-element-${i}`}
            className="absolute opacity-20 dark:opacity-10"
            style={{
              left: `${(i * 15) % 100}%`,
              top: `${(i * 20) % 80}%`,
              width: 80 + i * 20,
              height: 80 + i * 20,
            }}
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-300 to-success-300 dark:from-primary-600 dark:to-success-600" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced floating bubbles with better visibility */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute rounded-full bg-gradient-to-br from-primary-200/60 to-success-200/60 dark:from-primary-400/40 dark:to-success-400/40"
          style={{
            width: 20 + (i % 4) * 15,
            height: 20 + (i % 4) * 15,
            left: `${(i * 7) % 100}%`,
          }}
          animate={{
            y: ["100vh", "-10vh"],
            x: [0, Math.sin(i) * 100],
            scale: [0, 1, 0.8, 0],
            rotate: [0, 360],
            opacity: [0, 0.8, 0.6, 0],
          }}
          transition={{
            duration: 8 + (i % 3) * 2,
            delay: i * 0.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {jobCards.map((job, index) => {
        const position = cardPositions[index]
        const animation = getAnimationPattern(index)

        return (
          <motion.div
            key={index}
            className="absolute w-72 optimize-animation"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              zIndex: 10 + index,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
              rotate: position.rotation,
            }}
            animate={{
              opacity: isInView ? 1 : 0,
              scale: isInView ? 1 : 0.8,
              y: isInView ? animation.y : 0,
              x: isInView ? animation.x || 0 : 0,
              rotate: isInView ? animation.rotate : position.rotation,
            }}
            transition={{
              opacity: { duration: 0.6, delay: index * 0.15 },
              scale: { duration: 0.6, delay: index * 0.15 },
              y: {
                duration: animation.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              },
              x: animation.x
                ? {
                    duration: animation.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }
                : {},
              rotate: {
                duration: animation.duration,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.3,
              },
            }}
            whileHover={{
              scale: 1.05,
              rotate: 0,
              zIndex: 50,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              transition: { duration: 0.3 },
            }}
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            dragElastic={0.1}
          >
            <Card className="p-4 border-professional-200 dark:border-professional-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-professional-800 dark:text-professional-100 text-sm leading-tight">
                  {job.title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-professional-600 dark:text-professional-300">{job.rating}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center text-professional-700 dark:text-professional-200">
                  <Building className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.company}</span>
                </div>
                <div className="flex items-center text-success-600 dark:text-success-400">
                  <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center text-primary-600 dark:text-primary-400">
                  <DollarSign className="h-3 w-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{job.salary}</span>
                </div>
              </div>

              <div className="mt-3 p-2 bg-gradient-to-r from-professional-50 to-primary-50 dark:from-professional-800 dark:to-primary-900 rounded-md border border-professional-100 dark:border-professional-700">
                <p className="text-xs text-professional-700 dark:text-professional-200 italic">"{job.invitation}"</p>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Users className="h-3 w-3 text-professional-500 dark:text-professional-400" />
                  <span className="text-xs text-professional-600 dark:text-professional-300">
                    {job.connections} connections
                  </span>
                </div>
                <div className="text-xs text-professional-600 dark:text-professional-300">by {job.referrer}</div>
              </div>

              <div className="mt-3 flex space-x-2">
                <Badge
                  variant="outline"
                  className="bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-700 text-xs"
                >
                  <Briefcase className="h-2 w-2 mr-1" /> Interactive
                </Badge>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    className="text-xs h-6 px-2 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MessageCircle className="h-2 w-2 mr-1" />
                    Connect
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )
      })}

      {/* Floating connection lines between cards */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        {jobCards.slice(0, -1).map((_, index) => {
          const pos1 = cardPositions[index]
          const pos2 = cardPositions[index + 1]
          return (
            <motion.line
              key={`line-${index}`}
              x1={`${pos1.x + 18}%`}
              y1={`${pos1.y + 15}%`}
              x2={`${pos2.x + 18}%`}
              y2={`${pos2.y + 15}%`}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="2"
              strokeDasharray="5,5"
              className="dark:stroke-primary-400/30"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: isInView ? 1 : 0,
                opacity: isInView ? 1 : 0,
              }}
              transition={{
                duration: 2,
                delay: index * 0.3 + 1,
                ease: "easeInOut",
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
