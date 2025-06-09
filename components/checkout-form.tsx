"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createCheckoutSession, validatePaymentDetails } from "@/services/payment-service"
import { useAuth } from "@/components/auth-provider"
import { motion } from "framer-motion"
import { CreditCard, Shield } from "lucide-react"
import type { SubscriptionPlan, PaymentDetails } from "@/types"

interface CheckoutFormProps {
  plan: SubscriptionPlan
  onSuccess?: () => void
  onCancel?: () => void
}

export function CheckoutForm({ plan, onSuccess, onCancel }: CheckoutFormProps): JSX.Element {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<string[]>([])
  const [cardDetails, setCardDetails] = useState<PaymentDetails>({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
  })

  const handleInputChange = (field: keyof PaymentDetails) => (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    // Format card number with spaces
    if (field === "number") {
      value = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      if (value.length > 19) return // Limit to 16 digits + 3 spaces
    }

    // Format expiry date
    if (field === "expiry") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      if (value.length > 5) return
    }

    // Limit CVC to 4 digits
    if (field === "cvc") {
      value = value.replace(/\D/g, "")
      if (value.length > 4) return
    }

    setCardDetails((prev) => ({ ...prev, [field]: value }))
    setErrors([]) // Clear errors when user starts typing
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!user) return

    const validation = validatePaymentDetails(cardDetails)
    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setIsLoading(true)
    try {
      await createCheckoutSession(plan.id, user.id, cardDetails)

      // Simulate successful payment
      setTimeout(() => {
        setIsLoading(false)
        if (onSuccess) onSuccess()
      }, 1500)
    } catch (error) {
      console.error("Payment error:", error)
      setErrors(["Payment failed. Please try again."])
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md mx-auto border-teal-200">
        <CardHeader>
          <CardTitle className="text-teal-800">Subscribe to {plan.name}</CardTitle>
          <CardDescription>
            {plan.price === 0 ? "Free forever" : `$${plan.price}/month - ${plan.description}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.length > 0 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <ul className="text-sm text-red-600 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={cardDetails.name}
                onChange={handleInputChange("name")}
                required
                className="border-teal-200 focus-visible:ring-teal-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="number">Card Number</Label>
              <div className="relative">
                <Input
                  id="number"
                  placeholder="4242 4242 4242 4242"
                  value={cardDetails.number}
                  onChange={handleInputChange("number")}
                  required
                  className="pl-10 border-teal-200 focus-visible:ring-teal-500"
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-teal-500" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={handleInputChange("expiry")}
                  required
                  className="border-teal-200 focus-visible:ring-teal-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input
                  id="cvc"
                  placeholder="123"
                  value={cardDetails.cvc}
                  onChange={handleInputChange("cvc")}
                  required
                  className="border-teal-200 focus-visible:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-teal-700">
              <Shield className="h-4 w-4" />
              <span>Your payment information is secure</span>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="border-teal-200 text-teal-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e as any)}
            disabled={isLoading}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {isLoading ? "Processing..." : `Pay $${plan.price}`}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
