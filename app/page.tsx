"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, Briefcase, Star, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Logo } from "@/components/logo"
import { InteractiveAnimation } from "@/components/interactive-animation"
import { FloatingJobCards } from "@/components/floating-job-cards"
import { CompanyLogo } from "@/components/company-logos"
import { motion } from "framer-motion"
import { PricingSection } from "@/components/pricing-section"
import { Background3D } from "@/components/background-3d"
import { ThemeToggle } from "@/components/theme-toggle"
import JobHeroImage from "@/components/job-hero-image"

export default function HomePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
    }
  }, [user, router])

  if (user) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-professional-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Background3D />
      {/* Header */}
      <header
        className={`border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className="text-professional-700 dark:text-professional-200 hover:text-professional-800 dark:hover:text-professional-100 hover:bg-professional-50 dark:hover:bg-professional-800/20 transition-all duration-300"
                >
                  Login
                </Button>
              </motion.div>
            </Link>
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg transition-all duration-300">
                  Get Started
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-center md:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-bold mb-6 text-professional-800 dark:text-professional-100">
                Find Your Dream Job Through
                <span className="gradient-text"> Professional Referrals</span>
              </h1>
              <p className="text-xl text-professional-700 dark:text-professional-200 mb-8">
                Connect with industry professionals across India and get referred to top companies. Access exclusive job
                opportunities that aren't posted anywhere else.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="text-lg px-8 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Start Job Search <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 border-success-300 dark:border-success-600 text-success-600 dark:text-success-400 hover:bg-success-50 dark:hover:bg-success-900/20 w-full sm:w-auto transition-all duration-300"
                    >
                      I'm a Referrer
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="optimize-animation h-[400px]"
            >
              <JobHeroImage />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section with Company Logos */}
      <section className="py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-lg font-medium text-professional-700 dark:text-professional-200 mb-8">
            Trusted by professionals from
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {["Google", "Microsoft", "Amazon", "Apple", "Meta"].map((company, index) => (
              <motion.div
                key={company}
                className="flex flex-col items-center space-y-2"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CompanyLogo name={company} className="w-12 h-12" />
                <span className="text-sm font-medium text-professional-600 dark:text-professional-300">{company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Animation Section */}
      <section className="py-16 bg-gradient-to-b from-white to-professional-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-professional-800 dark:text-professional-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How JobConnect Works
            </motion.h2>
            <motion.p
              className="text-professional-700 dark:text-professional-200 mt-2 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our platform connects job seekers with professionals who can refer them to opportunities at top companies
              across India
            </motion.p>
          </div>
          <InteractiveAnimation />
        </div>
      </section>

      {/* Interactive Job Cards Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className="text-3xl font-bold text-professional-800 dark:text-professional-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Discover Opportunities
            </motion.h2>
            <motion.p
              className="text-professional-700 dark:text-professional-200 mt-2 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore real opportunities across India with personal invitations from industry professionals.
            </motion.p>
          </div>
          <FloatingJobCards />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-professional-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-professional-800 dark:text-professional-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose JobConnect?
          </motion.h2>
          <motion.p
            className="text-center text-professional-700 dark:text-professional-200 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Our platform offers unique advantages that help you stand out in the Indian job market
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Professional Network",
                description:
                  "Connect with professionals from top companies across India who can refer you to exclusive opportunities.",
                color: "text-primary-600 dark:text-primary-400",
                delay: 0,
              },
              {
                icon: Briefcase,
                title: "Quality Referrals",
                description:
                  "Access high-quality job referrals from verified professionals across various industries in India.",
                color: "text-success-500 dark:text-success-400",
                delay: 0.1,
              },
              {
                icon: Star,
                title: "Premium Features",
                description: "Upgrade to premium for advanced filters, unlimited connections, and priority support.",
                color: "text-accent-500 dark:text-accent-400",
                delay: 0.2,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="interactive-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <Card className="h-full border-professional-200 dark:border-professional-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors bg-white dark:bg-gray-900">
                  <CardHeader>
                    <feature.icon className={`h-12 w-12 ${feature.color} mb-4`} />
                    <CardTitle className="text-professional-800 dark:text-professional-100">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-professional-700 dark:text-professional-200">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-professional-800 dark:text-professional-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="text-center text-professional-700 dark:text-professional-200 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Hear from job seekers who found their dream jobs through JobConnect across India
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Software Engineer at Google India",
                quote:
                  "JobConnect helped me land my dream job at Google's Bangalore office. The referral I received made all the difference in getting my foot in the door.",
              },
              {
                name: "Arjun Patel",
                role: "Product Manager at Amazon India",
                quote:
                  "After months of applying to jobs with no response, I got a referral through JobConnect and received an offer within 2 weeks from Amazon Mumbai!",
              },
              {
                name: "Sneha Reddy",
                role: "UX Designer at Microsoft India",
                quote:
                  "The premium features were worth every penny. The advanced filters helped me find exactly the right opportunity in Hyderabad for my skills.",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="interactive-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-professional-200 dark:border-professional-700 bg-white dark:bg-gray-900">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-4 bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-primary-800 dark:text-primary-200 font-bold text-xl">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <p className="text-professional-700 dark:text-professional-200 italic mb-4">
                        "{testimonial.quote}"
                      </p>
                      <h3 className="font-semibold text-professional-800 dark:text-professional-100">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-professional-600 dark:text-professional-300">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-success-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Ready to Accelerate Your Job Search in India?
          </motion.h2>
          <motion.p
            className="text-xl mb-8 max-w-2xl mx-auto text-primary-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of professionals who found their dream jobs through referrals across India
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/register">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="text-lg px-8 bg-white text-primary-700 hover:bg-primary-50 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-4 text-professional-800 dark:text-professional-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-center text-professional-700 dark:text-professional-200 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find answers to common questions about JobConnect
          </motion.p>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "How does JobConnect work in India?",
                answer:
                  "JobConnect connects job seekers with professionals across India who can refer them to opportunities at their companies. You create a profile, search for relevant jobs in cities like Bangalore, Mumbai, Delhi, and more, and request referrals from our network of professionals.",
              },
              {
                question: "What's the difference between free and premium plans?",
                answer:
                  "Free users can request up to 5 referrals per month and access basic search functionality. Premium users (₹2,499/month) get unlimited referral requests, advanced search filters, direct messaging with referrers, access to premium job listings, and personalized feedback.",
              },
              {
                question: "How effective are referrals in the Indian job market?",
                answer:
                  "Referrals are extremely effective in India. Candidates who are referred are 15 times more likely to be hired than those who apply through job boards, and the hiring process is typically 55% faster for referred candidates.",
              },
              {
                question: "Can I cancel my premium subscription anytime?",
                answer:
                  "Yes, you can cancel your premium subscription at any time. Your premium benefits will continue until the end of your current billing cycle.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="border border-professional-200 dark:border-professional-700 rounded-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center p-4 cursor-pointer bg-professional-50 dark:bg-gray-800 hover:bg-professional-100 dark:hover:bg-gray-700 transition-colors">
                    <h3 className="font-medium text-professional-800 dark:text-professional-100">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 text-professional-600 dark:text-professional-300 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="p-4 bg-white dark:bg-gray-900">
                    <p className="text-professional-700 dark:text-professional-200">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-professional-800 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" showText={true} className="text-white mb-4" />
              <p className="text-professional-200 dark:text-professional-300 text-sm">
                Connecting job seekers with professional referrals to accelerate their career growth across India.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-professional-200 dark:text-professional-300 hover:text-white transition-colors"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-professional-700 dark:border-professional-600 text-center">
            <p className="text-professional-200 dark:text-professional-300">© 2024 JobConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
