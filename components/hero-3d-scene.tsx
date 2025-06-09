"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Users, Building, Star, Zap, Target, Network, Globe, Rocket } from "lucide-react"

export function Hero3DScene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMousePosition({
        x: (e.clientX - centerX) / 20,
        y: (e.clientY - centerY) / 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const floatingElements = [
    { Icon: Briefcase, color: "bg-primary-500", delay: 0, x: 20, y: 30, size: "w-16 h-16", rotation: 0 },
    { Icon: Users, color: "bg-success-500", delay: 0.2, x: 70, y: 20, size: "w-12 h-12", rotation: 45 },
    { Icon: Building, color: "bg-accent-500", delay: 0.4, x: 80, y: 70, size: "w-14 h-14", rotation: 90 },
    { Icon: Star, color: "bg-primary-600", delay: 0.6, x: 10, y: 60, size: "w-10 h-10", rotation: 135 },
    { Icon: Zap, color: "bg-success-400", delay: 0.8, x: 60, y: 80, size: "w-12 h-12", rotation: 180 },
    { Icon: Target, color: "bg-accent-600", delay: 1, x: 40, y: 15, size: "w-14 h-14", rotation: 225 },
    { Icon: Network, color: "bg-primary-400", delay: 1.2, x: 85, y: 45, size: "w-11 h-11", rotation: 270 },
    { Icon: Globe, color: "bg-success-600", delay: 1.4, x: 15, y: 25, size: "w-13 h-13", rotation: 315 },
    { Icon: Rocket, color: "bg-accent-400", delay: 1.6, x: 55, y: 55, size: "w-15 h-15", rotation: 360 },
  ]

  // Floating bubbles
  const bubbles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 4,
  }))

  // 3D Background geometric shapes
  const backgroundShapes = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 10 + 15,
    shape: i % 3, // 0: circle, 1: square, 2: triangle
  }))

  return (
    <div
      ref={containerRef}
      className="relative w-full h-96 bg-gradient-to-br from-professional-50 via-primary-50 to-success-50 rounded-2xl overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {/* 3D Background geometric shapes */}
      {backgroundShapes.map((shape) => (
        <motion.div
          key={`bg-${shape.id}`}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {shape.shape === 0 && (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-300 to-success-300" />
          )}
          {shape.shape === 1 && (
            <div className="w-full h-full bg-gradient-to-br from-accent-300 to-primary-300 transform rotate-45" />
          )}
          {shape.shape === 2 && (
            <div
              className="w-full h-full bg-gradient-to-br from-success-300 to-accent-300"
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Animated background gradient */}
      <div className="absolute inset-0 animated-gradient opacity-30" />

      {/* Floating bubbles with new animation */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="bubble absolute rounded-full bg-gradient-to-br from-primary-200/40 to-success-200/40"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
          }}
          animate={{
            y: [window.innerHeight, -100],
            x: [0, Math.sin(bubble.id) * 50],
            scale: [0, 1, 0.8, 0],
            rotate: [0, 360],
            opacity: [0, 0.7, 0.5, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Central morphing sphere */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 shadow-2xl animate-morph animate-glow"
        style={{
          transform: `translate(-50%, -50%) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Briefcase className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced floating elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.size} ${element.color} rounded-full shadow-lg flex items-center justify-center glass-effect`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            transform: `translate(-50%, -50%) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg) translateZ(${index * 20}px)`,
          }}
          initial={{
            scale: 0,
            opacity: 0,
            rotateZ: element.rotation,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0],
            rotateZ: [element.rotation, element.rotation + 360],
          }}
          transition={{
            duration: 0.6,
            delay: element.delay,
            rotateX: {
              duration: 4 + index * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotateY: {
              duration: 6 + index * 0.3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            rotateZ: {
              duration: 10 + index * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            },
          }}
          whileHover={{
            scale: 1.3,
            rotateZ: element.rotation + 180,
            transition: { duration: 0.3 },
          }}
        >
          <element.Icon className="w-6 h-6 text-white" />
        </motion.div>
      ))}

      {/* Multiple orbiting rings */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-primary-300/50 rounded-full"
        style={{
          transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${mousePosition.x * 2}deg)`,
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 border-2 border-success-300/30 rounded-full"
        style={{
          transform: `translate(-50%, -50%) rotateX(75deg) rotateY(${mousePosition.x * -1.5}deg)`,
        }}
        animate={{ rotateZ: -360 }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 border border-accent-200/20 rounded-full"
        style={{
          transform: `translate(-50%, -50%) rotateX(60deg) rotateY(${mousePosition.x * 1}deg)`,
        }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Enhanced particle effects */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
