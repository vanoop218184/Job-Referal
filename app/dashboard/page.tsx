"use client"

import { useAuth } from "@/components/auth-provider"
import { JobSeekerDashboard } from "@/components/job-seeker-dashboard"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (user?.role === "admin") {
      router.push("/admin")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user || user.role !== "job_seeker") {
    return null
  }

  return <JobSeekerDashboard />
}
