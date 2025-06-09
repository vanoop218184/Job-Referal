"use client"

import { useEffect, useRef, useState, type MouseEvent } from "react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import { Briefcase, Building, Users, Award, Zap, Target, type LucideIcon } from "lucide-react"

interface IconItem {
  Icon: LucideIcon
  color: string
  initialX: string
  initialY: string
}

interface MousePosition {
  x: number
  y: number
}

const iconVariants: Variants = {
  hidden: { x: 0, y: 0, scale: 0, opacity: 0 },
  visible: (custom: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      delay: custom * 0.1,
    },
  }),
}

export function InteractiveAnimation(): JSX.Element {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const controls = useAnimation()
  const isInView = useInView(containerRef, { once: false, amount: 0.5 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const handleMouseEnter = (): void => setIsHovering(true)
    const handleMouseLeave = (): void => setIsHovering(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mousemove", handleMouseMove as any)
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove as any)
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  const icons: IconItem[] = [
    { Icon: Briefcase, color: "text-blue-600", initialX: "20%", initialY: "30%" },
    { Icon: Building, color: "text-blue-850", initialX: "70%", initialY: "20%" },
    { Icon: Users, color: "text-blue-700", initialX: "80%", initialY: "60%" },
    { Icon: Award, color: "text-blue-500", initialX: "40%", initialY: "70%" },
    { Icon: Zap, color: "text-blue-600", initialX: "10%", initialY: "60%" },
    { Icon: Target, color: "text-blue-850", initialX: "50%", initialY: "40%" },
  ]

  return (
    <div
      ref={containerRef}
      className="relative h-[400px] w-full rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 overflow-hidden cursor-pointer optimize-animation"
    >
      <div className="absolute inset-0 animated-gradient opacity-50"></div>

      {icons.map((item, index) => {
        const { Icon, color, initialX, initialY } = item
        const iconCenterX = (Number.parseFloat(initialX) / 100) * (containerRef.current?.offsetWidth || 0)
        const iconCenterY = (Number.parseFloat(initialY) / 100) * (containerRef.current?.offsetHeight || 0)

        const distance = calculateDistance(mousePosition.x, mousePosition.y, iconCenterX, iconCenterY)
        const maxDistance = 150
        const repelStrength = isHovering ? Math.max(0, 1 - distance / maxDistance) * 40 : 0

        const angle = Math.atan2(mousePosition.y - iconCenterY, mousePosition.x - iconCenterX)
        const repelX = -Math.cos(angle) * repelStrength
        const repelY = -Math.sin(angle) * repelStrength

        return (
          <motion.div
            key={index}
            className={`absolute ${color} bg-white rounded-full p-3 shadow-lg optimize-animation`}
            style={{
              left: initialX,
              top: initialY,
              transform: `translate(${repelX}px, ${repelY}px)`,
            }}
            initial="hidden"
            animate={controls}
            variants={iconVariants}
            custom={index}
            whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
          >
            <Icon className="h-8 w-8" />
          </motion.div>
        )
      })}

      <motion.div
        className="absolute inset-0 flex items-center justify-center optimize-animation"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="text-center px-6 py-4 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
          <h3 className="text-xl font-bold text-blue-850">Interactive Job Network</h3>
          <p className="text-blue-700">Drag the icons or hover to interact</p>
        </div>
      </motion.div>
    </div>
  )
}
