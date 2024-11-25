const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Substitua pelo seu Secret Key
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // O segredo do webhook fornecido pelo Stripe

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const sig = event.headers['stripe-signature'];

  let eventStripe;
  try {
    eventStripe = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error(`⚠️ Webhook signature verification failed.`, err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  // Handle the event
  switch (eventStripe.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = eventStripe.data.object;
      console.log(`PaymentIntent was successful!`);
      break;
    case 'checkout.session.completed':
      const session = eventStripe.data.object;
      console.log(`Checkout session completed!`);
      break;
    default:
      console.log(`Unhandled event type ${eventStripe.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
