const stripe = require('stripe')(
  'sk_test_51QOdWGE7oRUy6lRCqHCvnwczwt60S3EiCUBK8qz91tvvtIzZ6DM80SBbNov5TQ9buFZaNxT86Eygo4q8TCuX40vm00fPyRedUn'
); // Substitua pelo seu Secret Key
const endpointSecret = 'whsec_oZlDPIs4vRmudtIjkon5ouJFUduSMV56'; // O segredo do webhook fornecido pelo Stripe

exports.handler = async (event) => {
  // Verifique se o método HTTP é POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  // Obtenha a assinatura do Stripe
  const sig = event.headers['stripe-signature'];

  let eventStripe;
  try {
    eventStripe = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  switch (eventStripe.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = eventStripe.data.object;
      console.log(`PaymentIntent was successful! ID: ${paymentIntent.id}`); // Inclua detalhes no log
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      await handleProcessWebhookUpdatedSubscription(event.data);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
