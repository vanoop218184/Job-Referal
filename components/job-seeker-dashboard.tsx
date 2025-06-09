"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, MapPin, Building, DollarSign, Star, MessageCircle, Crown, Filter } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"

// Mock data for job referrals with Indian locations and currency
const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    salary: "₹15L - ₹25L",
    type: "Full-time",
    referrer: "Priya Sharma",
    referrerTitle: "Engineering Manager",
    description: "Looking for a senior engineer to join our growing team in Bangalore...",
    requirements: ["5+ years experience", "React/Node.js", "System design"],
    premium: false,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Mumbai, Maharashtra",
    salary: "₹12L - ₹20L",
    type: "Full-time",
    referrer: "Arjun Patel",
    referrerTitle: "VP of Product",
    description: "Seeking a PM to drive product strategy in our Mumbai office...",
    requirements: ["3+ years PM experience", "B2B SaaS", "Analytics"],
    premium: true,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataFlow Corp",
    location: "Hyderabad, Telangana",
    salary: "₹10L - ₹18L",
    type: "Full-time",
    referrer: "Sneha Reddy",
    referrerTitle: "Head of Data",
    description: "Join our data science team in Hyderabad to build ML models...",
    requirements: ["Python/R", "Machine Learning", "Statistics"],
    premium: true,
  },
]

export function JobSeekerDashboard() {
  const { user, logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [companyFilter, setCompanyFilter] = useState("")
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)

  const isPremium = user?.subscription === "premium"
  const filteredJobs = mockJobs.filter((job) => {
    if (!isPremium && job.premium) return false
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleRequestReferral = (job: any) => {
    if (!isPremium && job.premium) {
      setShowUpgrade(true)
      return
    }
    // Handle referral request
    alert(`Referral request sent for ${job.title} at ${job.company}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-professional-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 border-b backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo size="md" />
            <Badge
              variant={isPremium ? "default" : "secondary"}
              className={isPremium ? "bg-gradient-to-r from-primary-600 to-primary-700" : ""}
            >
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <span className="text-sm text-professional-700 dark:text-professional-200">Welcome, {user?.name}</span>
            {!isPremium && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  onClick={() => setShowUpgrade(true)}
                  className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade
                </Button>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={logout}
                className="border-professional-200 dark:border-professional-700 text-professional-700 dark:text-professional-200 hover:bg-professional-50 dark:hover:bg-professional-800/20"
              >
                Logout
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-professional-100 dark:bg-gray-800">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-primary-700 data-[state=active]:text-white">
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-primary-700 data-[state=active]:text-white"
            >
              My Applications
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-primary-700 data-[state=active]:text-white">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-professional-200 dark:border-professional-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="flex items-center text-professional-800 dark:text-professional-100">
                  <Search className="h-5 w-5 mr-2 text-primary-700 dark:text-primary-400" />
                  Find Your Next Opportunity in India
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search jobs, companies, or roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-professional-200 dark:border-professional-700 focus-visible:ring-primary-500"
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md">
                      <Search className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>

                {isPremium && (
                  <div className="flex gap-4">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-48 border-professional-200 dark:border-professional-700">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bangalore">Bangalore</SelectItem>
                        <SelectItem value="mumbai">Mumbai</SelectItem>
                        <SelectItem value="delhi">Delhi NCR</SelectItem>
                        <SelectItem value="hyderabad">Hyderabad</SelectItem>
                        <SelectItem value="pune">Pune</SelectItem>
                        <SelectItem value="chennai">Chennai</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={companyFilter} onValueChange={setCompanyFilter}>
                      <SelectTrigger className="w-48 border-professional-200 dark:border-professional-700">
                        <SelectValue placeholder="Company Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="mid">Mid-size</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {!isPremium && (
                  <div className="flex items-center justify-between p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-700">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                      <span className="text-sm text-primary-800 dark:text-primary-200">
                        Unlock advanced filters with Premium
                      </span>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        onClick={() => setShowUpgrade(true)}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md"
                      >
                        Upgrade Now
                      </Button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Job Listings */}
            <div className="grid gap-6">
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="interactive-card"
                >
                  <Card className="border-professional-200 dark:border-professional-700 bg-white dark:bg-gray-900">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-professional-800 dark:text-professional-100">
                            {job.title}
                            {job.premium && (
                              <Badge
                                variant="secondary"
                                className="bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300"
                              >
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2 text-professional-700 dark:text-professional-200">
                            <span className="flex items-center">
                              <Building className="h-4 w-4 mr-1" />
                              {job.company}
                            </span>
                            <span className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {job.location}
                            </span>
                            <span className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              {job.salary}
                            </span>
                          </CardDescription>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-professional-200 dark:border-professional-700 text-professional-700 dark:text-professional-200"
                        >
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-professional-700 dark:text-professional-200">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-professional-600 dark:text-professional-300">
                              Referred by:
                            </span>
                            <span className="text-sm font-medium text-professional-800 dark:text-professional-100">
                              {job.referrer}
                            </span>
                            <span className="text-xs text-professional-500 dark:text-professional-400">
                              ({job.referrerTitle})
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-professional-200 dark:border-professional-700 text-professional-700 dark:text-professional-200 hover:bg-professional-50 dark:hover:bg-professional-800/20"
                                  >
                                    View Details
                                  </Button>
                                </motion.div>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl bg-white dark:bg-gray-900">
                                <DialogHeader>
                                  <DialogTitle className="text-professional-800 dark:text-professional-100">
                                    {job.title} at {job.company}
                                  </DialogTitle>
                                  <DialogDescription className="text-professional-700 dark:text-professional-200">
                                    Referred by {job.referrer} • {job.referrerTitle}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2 text-professional-800 dark:text-professional-100">
                                      Job Description
                                    </h4>
                                    <p className="text-sm text-professional-700 dark:text-professional-200">
                                      {job.description}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-professional-800 dark:text-professional-100">
                                      Requirements
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-professional-700 dark:text-professional-200">
                                      {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                onClick={() => handleRequestReferral(job)}
                                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md"
                              >
                                Request Referral
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {!isPremium && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-primary-200 dark:border-primary-700 bg-gradient-to-br from-primary-50 to-success-50 dark:from-primary-900/20 dark:to-success-900/20">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-professional-800 dark:text-professional-100">
                      Unlock Premium Jobs
                    </h3>
                    <p className="text-professional-700 dark:text-professional-200 mb-4">
                      Get access to exclusive premium referrals and advanced features across India
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => setShowUpgrade(true)}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg"
                      >
                        Upgrade to Premium
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border-professional-200 dark:border-professional-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-professional-800 dark:text-professional-100">My Applications</CardTitle>
                <CardDescription className="text-professional-700 dark:text-professional-200">
                  Track your referral requests and applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-professional-600 dark:text-professional-300">
                  No applications yet. Start browsing jobs to request referrals!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="border-professional-200 dark:border-professional-700 bg-white dark:bg-gray-900">
              <CardHeader>
                <CardTitle className="text-professional-800 dark:text-professional-100">Feedback & Support</CardTitle>
                <CardDescription className="text-professional-700 dark:text-professional-200">
                  {isPremium
                    ? "Get personalized feedback and coaching"
                    : "Upgrade to Premium for personalized feedback"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isPremium ? (
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Describe your job search challenges or ask for advice..."
                      className="border-professional-200 dark:border-professional-700 focus-visible:ring-primary-500"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Submit Feedback Request
                      </Button>
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-primary-400 dark:text-primary-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-professional-800 dark:text-professional-100">
                      Premium Feature
                    </h3>
                    <p className="text-professional-700 dark:text-professional-200 mb-4">
                      Get personalized feedback on your applications and career advice from industry experts
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => setShowUpgrade(true)}
                        className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg"
                      >
                        Upgrade to Premium
                      </Button>
                    </motion.div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent className="bg-white dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="flex items-center text-professional-800 dark:text-professional-100">
              <Crown className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription className="text-professional-700 dark:text-professional-200">
              Unlock all features and get unlimited access to job referrals across India
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-professional-800 dark:text-professional-100">Free Plan</h4>
                <ul className="text-sm text-professional-700 dark:text-professional-200 space-y-1">
                  <li>• 5 referrals/month</li>
                  <li>• Basic search</li>
                  <li>• Community support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-professional-800 dark:text-professional-100">Premium Plan</h4>
                <ul className="text-sm text-professional-700 dark:text-professional-200 space-y-1">
                  <li>• Unlimited referrals</li>
                  <li>• Advanced filters</li>
                  <li>• Direct messaging</li>
                  <li>• Premium jobs</li>
                  <li>• Feedback & coaching</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-professional-200 dark:border-professional-700">
              <span className="text-2xl font-bold text-professional-800 dark:text-professional-100">₹2,499/month</span>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-lg">
                  Upgrade Now
                </Button>
              </motion.div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
