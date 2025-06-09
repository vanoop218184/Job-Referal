"use client"

import { motion } from "framer-motion"

export function Background3D() {
  // Generate random 3D shapes for background
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 150 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 20 + 15,
    shape: i % 4, // 0: circle, 1: square, 2: triangle, 3: hexagon
    opacity: Math.random() * 0.1 + 0.02,
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
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
          {shape.shape === 3 && (
            <div
              className="w-full h-full bg-gradient-to-br from-primary-400 to-success-400"
              style={{
                clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
