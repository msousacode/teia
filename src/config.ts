export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      started: {
        priceId: 'price_1RzPKwE7oRUy6lRCph7zu7zG',
      },
      profisional: {
        priceId: 'price_1RzPLqE7oRUy6lRCdgk3ENr8',
      },
      clinic: {
        priceId: 'price_1RzPMQE7oRUy6lRCUr5KgTLL',
      },
    },
  },
};
