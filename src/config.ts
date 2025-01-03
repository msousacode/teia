export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      pro: {
        priceId: 'price_1QcyDYE7oRUy6lRCI6iyzfOD',
      },
    },
  },
};
