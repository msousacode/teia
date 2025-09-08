export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      started: {
        priceId: 'price_1S4sZhE7oRUy6lRC6el4ZdMk',
      },
      profisional: {
        priceId: 'price_1S4sZxE7oRUy6lRCtWWDqWEp',
      },
      clinic: {
        priceId: 'price_1S4saFE7oRUy6lRCWYLURmqH',
      },
    },
  },
};
