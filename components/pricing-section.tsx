"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckoutForm } from "@/components/checkout-form"
import { subscriptionPlans } from "@/services/payment-service"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"

export function PricingSection() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0])
  const [showCheckout, setShowCheckout] = useState(false)

  const handleSelectPlan = (plan: (typeof subscriptionPlans)[0]) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to subscribe to a plan",
        variant: "destructive",
      })
      return
    }

    setSelectedPlan(plan)
    setShowCheckout(true)
  }

  const handleCheckoutSuccess = () => {
    setShowCheckout(false)
    toast({
      title: "Subscription Successful!",
      description: `You are now subscribed to the ${selectedPlan.name}`,
      variant: "default",
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-success-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-4 text-professional-800 dark:text-professional-100"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Plan
        </motion.h2>
        <motion.p
          className="text-center text-professional-700 dark:text-professional-200 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Select the plan that best fits your needs. Upgrade anytime to unlock more features and opportunities.
        </motion.p>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {subscriptionPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="interactive-card"
            >
              <Card
                className={`border-professional-200 dark:border-professional-700 h-full ${plan.popular ? "border-primary-300 dark:border-primary-600 shadow-md ring-2 ring-primary-200 dark:ring-primary-700" : ""} bg-white dark:bg-gray-900`}
              >
                <CardHeader>
                  {plan.popular && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary-500 to-success-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  <CardTitle className="flex items-center justify-between text-professional-800 dark:text-professional-100">
                    {plan.name}
                    <Badge
                      variant={plan.id === "free" ? "secondary" : "default"}
                      className={
                        plan.id !== "free" ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white" : ""
                      }
                    >
                      ₹{plan.price}/month
                    </Badge>
                  </CardTitle>
                  <CardDescription className="dark:text-professional-300">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-4 w-4 text-success-600 dark:text-success-400 mr-2 flex-shrink-0" />
                        <span className="text-professional-700 dark:text-professional-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full transition-all duration-300 ${
                        plan.id === "free"
                          ? "border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                          : "bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 shadow-md hover:shadow-lg"
                      }`}
                      variant={plan.id === "free" ? "outline" : "default"}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {plan.id === "free" ? "Get Started Free" : "Upgrade Now"}
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="sm:max-w-md">
          <CheckoutForm plan={selectedPlan} onSuccess={handleCheckoutSuccess} onCancel={() => setShowCheckout(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}
