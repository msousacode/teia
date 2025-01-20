export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      started: {
        priceId: 'price_1Qj9pME7oRUy6lRCyKuGL427',
      },
      profisional: {
        priceId: 'price_1QdGsHE7oRUy6lRCzLlA5ewd',
      },
      clinic: {
        priceId: 'price_1QdGsHE7oRUy6lRCzLlA5ewd',
      },
    },
  },
};
