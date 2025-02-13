export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      started: {
        priceId: 'price_1Qs6byE7oRUy6lRCx5nJEb6S',
      },
      profisional: {
        priceId: 'price_1Qs6cFE7oRUy6lRCn8S6Ml1i',
      },
      clinic: {
        priceId: 'price_1Qs6cQE7oRUy6lRCPlACzaQQ',
      },
    },
  },
};
