"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface LogoProps {
  className?: string
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

type SizeConfig = {
  [K in NonNullable<LogoProps["size"]>]: string
}

export function Logo({ className, size = "md", showText = true }: LogoProps): JSX.Element {
  const sizes: SizeConfig = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const textSizes: SizeConfig = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-850 rounded-md blur-sm opacity-30 animate-pulse"></div>
        <motion.div
          className={cn(sizes[size], "relative z-10")}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(sizes[size], "text-blue-850")}
          >
            <path
              d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="12" cy="14" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </div>
      {showText && <span className={cn("font-bold text-blue-850 dark:text-white", textSizes[size])}>JobConnect</span>}
    </div>
  )
}
