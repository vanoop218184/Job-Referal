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
import { motion } from "framer-motion"

// Mock data for job referrals
const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    referrer: "John Smith",
    referrerTitle: "Engineering Manager",
    description: "Looking for a senior engineer to join our growing team...",
    requirements: ["5+ years experience", "React/Node.js", "System design"],
    premium: false,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $140k",
    type: "Full-time",
    referrer: "Sarah Johnson",
    referrerTitle: "VP of Product",
    description: "Seeking a PM to drive product strategy...",
    requirements: ["3+ years PM experience", "B2B SaaS", "Analytics"],
    premium: true,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataFlow Corp",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Full-time",
    referrer: "Mike Chen",
    referrerTitle: "Head of Data",
    description: "Join our data science team to build ML models...",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo size="md" />
            <Badge variant={isPremium ? "default" : "secondary"} className={isPremium ? "bg-blue-700" : ""}>
              {isPremium ? "Premium" : "Free"}
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-700">Welcome, {user?.name}</span>
            {!isPremium && (
              <Button size="sm" onClick={() => setShowUpgrade(true)} className="bg-blue-700 hover:bg-blue-800">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade
              </Button>
            )}
            <Button variant="outline" onClick={logout} className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger
              value="applications"
              className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              My Applications
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            {/* Search and Filters */}
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Search className="h-5 w-5 mr-2 text-blue-700" />
                  Find Your Next Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Search jobs, companies, or roles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>

                {isPremium && (
                  <div className="flex gap-4">
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                      <SelectTrigger className="w-48 border-blue-200">
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sf">San Francisco</SelectItem>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={companyFilter} onValueChange={setCompanyFilter}>
                      <SelectTrigger className="w-48 border-blue-200">
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
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center">
                      <Filter className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="text-sm text-blue-800">Unlock advanced filters with Premium</span>
                    </div>
                    <Button size="sm" onClick={() => setShowUpgrade(true)} className="bg-blue-700 hover:bg-blue-800">
                      Upgrade Now
                    </Button>
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
                  <Card className="border-blue-100">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-blue-900">
                            {job.title}
                            {job.premium && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2 text-blue-700">
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
                        <Badge variant="outline" className="border-blue-200 text-blue-700">
                          {job.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-blue-700">{job.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-blue-600">Referred by:</span>
                            <span className="text-sm font-medium text-blue-800">{job.referrer}</span>
                            <span className="text-xs text-blue-500">({job.referrerTitle})</span>
                          </div>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle className="text-blue-900">
                                    {job.title} at {job.company}
                                  </DialogTitle>
                                  <DialogDescription className="text-blue-700">
                                    Referred by {job.referrer} • {job.referrerTitle}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="font-semibold mb-2 text-blue-900">Job Description</h4>
                                    <p className="text-sm text-blue-700">{job.description}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2 text-blue-900">Requirements</h4>
                                    <ul className="list-disc list-inside text-sm text-blue-700">
                                      {job.requirements.map((req, index) => (
                                        <li key={index}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              onClick={() => handleRequestReferral(job)}
                              className="bg-blue-700 hover:bg-blue-800"
                            >
                              Request Referral
                            </Button>
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
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">Unlock Premium Jobs</h3>
                    <p className="text-blue-700 mb-4">
                      Get access to exclusive premium referrals and advanced features
                    </p>
                    <Button onClick={() => setShowUpgrade(true)} className="bg-blue-700 hover:bg-blue-800">
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          <TabsContent value="applications">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">My Applications</CardTitle>
                <CardDescription className="text-blue-700">
                  Track your referral requests and applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-blue-600">
                  No applications yet. Start browsing jobs to request referrals!
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card className="border-blue-100">
              <CardHeader>
                <CardTitle className="text-blue-900">Feedback & Support</CardTitle>
                <CardDescription className="text-blue-700">
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
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                    <Button className="bg-blue-700 hover:bg-blue-800">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Submit Feedback Request
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">Premium Feature</h3>
                    <p className="text-blue-700 mb-4">
                      Get personalized feedback on your applications and career advice from industry experts
                    </p>
                    <Button onClick={() => setShowUpgrade(true)} className="bg-blue-700 hover:bg-blue-800">
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Upgrade Dialog */}
      <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-900">
              <Crown className="h-6 w-6 text-blue-600 mr-2" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription className="text-blue-700">
              Unlock all features and get unlimited access to job referrals
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 text-blue-900">Free Plan</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 5 referrals/month</li>
                  <li>• Basic search</li>
                  <li>• Community support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-900">Premium Plan</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Unlimited referrals</li>
                  <li>• Advanced filters</li>
                  <li>• Direct messaging</li>
                  <li>• Premium jobs</li>
                  <li>• Feedback & coaching</li>
                </ul>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-blue-100">
              <span className="text-2xl font-bold text-blue-900">$29/month</span>
              <Button className="bg-blue-700 hover:bg-blue-800">Upgrade Now</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
