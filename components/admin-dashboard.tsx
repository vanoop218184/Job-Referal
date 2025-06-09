"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Users, Briefcase, BarChart3 } from "lucide-react"
import { Logo } from "@/components/logo"
import { motion } from "framer-motion"

// Mock data
const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", subscription: "premium", joinDate: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", subscription: "free", joinDate: "2024-02-01" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", subscription: "premium", joinDate: "2024-01-20" },
]

const mockJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    status: "active",
    applications: 12,
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100k - $140k",
    status: "active",
    applications: 8,
  },
]

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [showAddJob, setShowAddJob] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    requirements: "",
    type: "full-time",
  })

  const handleAddJob = () => {
    // Handle adding new job
    console.log("Adding job:", newJob)
    setShowAddJob(false)
    setNewJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
      type: "full-time",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo size="md" />
            <Badge variant="destructive">Admin</Badge>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-blue-700">Welcome, {user?.name}</span>
            <Button variant="outline" onClick={logout} className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Total Users", icon: Users, value: "1,234", change: "+12% from last month" },
            { title: "Active Jobs", icon: Briefcase, value: "89", change: "+5 new this week" },
            { title: "Premium Users", icon: Users, value: "456", change: "37% conversion rate" },
            { title: "Monthly Revenue", icon: BarChart3, value: "$13,224", change: "+8% from last month" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="interactive-card"
            >
              <Card className="border-blue-100">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-900">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-900">{stat.value}</div>
                  <p className="text-xs text-blue-600">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList className="bg-blue-100">
            <TabsTrigger value="jobs" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              Manage Jobs
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              Manage Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-700 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-blue-900">Job Referrals</h2>
              <Dialog open={showAddJob} onOpenChange={setShowAddJob}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Job
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-blue-900">Add New Job Referral</DialogTitle>
                    <DialogDescription className="text-blue-700">
                      Create a new job referral opportunity for job seekers
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-blue-900">
                        Job Title
                      </Label>
                      <Input
                        id="title"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-blue-900">
                        Company
                      </Label>
                      <Input
                        id="company"
                        value={newJob.company}
                        onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                        placeholder="e.g. TechCorp Inc."
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-blue-900">
                        Location
                      </Label>
                      <Input
                        id="location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        placeholder="e.g. San Francisco, CA"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salary" className="text-blue-900">
                        Salary Range
                      </Label>
                      <Input
                        id="salary"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                        placeholder="e.g. $120k - $180k"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-blue-900">
                        Job Type
                      </Label>
                      <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                        <SelectTrigger className="border-blue-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-blue-900">
                      Job Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      placeholder="Describe the role, responsibilities, and what makes it exciting..."
                      rows={3}
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requirements" className="text-blue-900">
                      Requirements
                    </Label>
                    <Textarea
                      id="requirements"
                      value={newJob.requirements}
                      onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                      placeholder="List the key requirements (one per line)"
                      rows={3}
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddJob(false)}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddJob} className="bg-blue-700 hover:bg-blue-800">
                      Add Job
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-blue-100">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-900">Job Title</TableHead>
                      <TableHead className="text-blue-900">Company</TableHead>
                      <TableHead className="text-blue-900">Location</TableHead>
                      <TableHead className="text-blue-900">Applications</TableHead>
                      <TableHead className="text-blue-900">Status</TableHead>
                      <TableHead className="text-blue-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockJobs.map((job) => (
                      <TableRow key={job.id} className="hover:bg-blue-50">
                        <TableCell className="font-medium text-blue-900">{job.title}</TableCell>
                        <TableCell className="text-blue-700">{job.company}</TableCell>
                        <TableCell className="text-blue-700">{job.location}</TableCell>
                        <TableCell className="text-blue-700">{job.applications}</TableCell>
                        <TableCell>
                          <Badge
                            variant={job.status === "active" ? "default" : "secondary"}
                            className={job.status === "active" ? "bg-blue-700" : ""}
                          >
                            {job.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">User Management</h2>
            <Card className="border-blue-100">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-blue-50">
                      <TableHead className="text-blue-900">Name</TableHead>
                      <TableHead className="text-blue-900">Email</TableHead>
                      <TableHead className="text-blue-900">Subscription</TableHead>
                      <TableHead className="text-blue-900">Join Date</TableHead>
                      <TableHead className="text-blue-900">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-blue-50">
                        <TableCell className="font-medium text-blue-900">{user.name}</TableCell>
                        <TableCell className="text-blue-700">{user.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={user.subscription === "premium" ? "default" : "secondary"}
                            className={user.subscription === "premium" ? "bg-blue-700" : ""}
                          >
                            {user.subscription}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-blue-700">{user.joinDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-200 text-blue-700 hover:bg-blue-50"
                            >
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-900">Platform Settings</h2>
            <div className="grid gap-6">
              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Subscription Settings</CardTitle>
                  <CardDescription className="text-blue-700">Manage pricing and subscription features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="free-limit" className="text-blue-900">
                        Free Plan - Monthly Referrals
                      </Label>
                      <Input
                        id="free-limit"
                        type="number"
                        defaultValue="5"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="premium-price" className="text-blue-900">
                        Premium Plan Price
                      </Label>
                      <Input
                        id="premium-price"
                        defaultValue="$29"
                        className="border-blue-200 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>
                  <Button className="bg-blue-700 hover:bg-blue-800">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="border-blue-100">
                <CardHeader>
                  <CardTitle className="text-blue-900">Platform Configuration</CardTitle>
                  <CardDescription className="text-blue-700">General platform settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="platform-name" className="text-blue-900">
                      Platform Name
                    </Label>
                    <Input
                      id="platform-name"
                      defaultValue="JobConnect"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email" className="text-blue-900">
                      Support Email
                    </Label>
                    <Input
                      id="support-email"
                      defaultValue="support@jobconnect.com"
                      className="border-blue-200 focus-visible:ring-blue-500"
                    />
                  </div>
                  <Button className="bg-blue-700 hover:bg-blue-800">Save Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
