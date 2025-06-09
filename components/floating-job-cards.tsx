"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, MapPin, DollarSign, Briefcase } from "lucide-react"

const jobCards = [
  {
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
  },
  {
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $140k",
  },
  {
    title: "Data Scientist",
    company: "DataFlow Corp",
    location: "Remote",
    salary: "$90k - $130k",
  },
  {
    title: "UX Designer",
    company: "Creative Solutions",
    location: "Austin, TX",
    salary: "$85k - $120k",
  },
]

export function FloatingJobCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })

  return (
    <div ref={containerRef} className="relative h-[500px] w-full">
      {jobCards.map((job, index) => (
        <motion.div
          key={index}
          className="absolute w-64 optimize-animation"
          initial={{ x: `${20 + index * 15}%`, y: `${30 + index * 10}%`, rotate: index % 2 === 0 ? -3 : 3, opacity: 0 }}
          animate={{
            y: isInView ? [`${30 + index * 10}%`, `${25 + index * 10}%`, `${30 + index * 10}%`] : `${30 + index * 10}%`,
            opacity: isInView ? 1 : 0,
            transition: {
              y: {
                duration: 3 + index * 0.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: index * 0.2,
              },
              opacity: {
                duration: 0.5,
                delay: index * 0.2,
              },
            },
          }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            zIndex: 10,
            boxShadow: "0 20px 25px -5px rgba(10, 29, 138, 0.1), 0 10px 10px -5px rgba(10, 29, 138, 0.04)",
          }}
          drag
          dragConstraints={{
            top: -100,
            left: -100,
            right: 100,
            bottom: 100,
          }}
          dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        >
          <Card className="p-4 border-blue-100 bg-white shadow-md">
            <h3 className="font-bold text-blue-850">{job.title}</h3>
            <div className="mt-2 space-y-1 text-sm">
              <div className="flex items-center text-blue-700">
                <Building className="h-3 w-3 mr-1" />
                {job.company}
              </div>
              <div className="flex items-center text-blue-600">
                <MapPin className="h-3 w-3 mr-1" />
                {job.location}
              </div>
              <div className="flex items-center text-blue-500">
                <DollarSign className="h-3 w-3 mr-1" />
                {job.salary}
              </div>
            </div>
            <div className="mt-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Briefcase className="h-3 w-3 mr-1" /> Drag me!
              </Badge>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
