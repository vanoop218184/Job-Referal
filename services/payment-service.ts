import type { SubscriptionPlan, CheckoutSession, PaymentDetails } from "@/types"

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Plan",
    description: "Perfect for getting started",
    price: 0,
    features: ["5 referral requests per month", "Basic job search filters", "Community support"],
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "For serious job seekers",
    price: 29,
    features: [
      "Unlimited referral requests",
      "Advanced search filters",
      "Direct messaging with referrers",
      "Premium jobs",
      "Feedback & coaching",
    ],
    popular: true,
  },
]

export async function createCheckoutSession(
  planId: string,
  userId: string,
  paymentDetails?: PaymentDetails,
): Promise<CheckoutSession> {
  // In a real app, this would call your API to create a Stripe checkout session
  console.log(`Creating checkout session for plan ${planId} and user ${userId}`, paymentDetails)

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url: `/checkout-success?plan=${planId}`,
        sessionId: `cs_${Math.random().toString(36).substr(2, 9)}`,
      })
    }, 1000)
  })
}

export function validatePaymentDetails(details: PaymentDetails): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!details.name.trim()) {
    errors.push("Cardholder name is required")
  }

  if (!details.number.replace(/\s/g, "").match(/^\d{16}$/)) {
    errors.push("Card number must be 16 digits")
  }

  if (!details.expiry.match(/^\d{2}\/\d{2}$/)) {
    errors.push("Expiry date must be in MM/YY format")
  }

  if (!details.cvc.match(/^\d{3,4}$/)) {
    errors.push("CVC must be 3 or 4 digits")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
