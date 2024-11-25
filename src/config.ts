export const config = {
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    //webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    plans: {
      free: {
        priceId: 'price_1QOe2bE7oRUy6lRCob0SknLw',
        quota: {
          TASKS: 7,
        },
      },
      pro: {
        priceId: 'price_1QOe17E7oRUy6lRC6L0ju3ii',
        quota: {
          TASKS: -1,
        },
      },
    },
  },
};
