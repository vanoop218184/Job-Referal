import type React from "react"
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "job_seeker"
  subscription: "free" | "premium"
  avatar?: string
  joinDate?: string
}

export interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: "full-time" | "part-time" | "contract" | "internship"
  referrer: string
  referrerTitle: string
  description: string
  requirements: string[]
  premium: boolean
  status?: "active" | "inactive"
  applications?: number
  createdAt?: string
  updatedAt?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  features: string[]
  popular?: boolean
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  updateUser: (userData: Partial<User>) => void
}

export interface PaymentDetails {
  name: string
  number: string
  expiry: string
  cvc: string
}

export interface CheckoutSession {
  url: string
  sessionId?: string
}

export interface ToastProps {
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: "default" | "destructive"
}
