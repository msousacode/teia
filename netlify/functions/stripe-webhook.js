const stripe = require('stripe')(
  'sk_test_51QOdWGE7oRUy6lRCqHCvnwczwt60S3EiCUBK8qz91tvvtIzZ6DM80SBbNov5TQ9buFZaNxT86Eygo4q8TCuX40vm00fPyRedUn'
);

const axios = require('axios');

exports.handler = async (event) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const backendUrl = process.env.SYSABA_BACKEND;

  // Verifique se o método HTTP é POST
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
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  if (eventStripe.type == 'invoice.payment_succeeded') {
    const paymentIntent = eventStripe.data.object;

    const payload = {
      invoiceId: paymentIntent.id,
      customerId: paymentIntent.customer,
      email: paymentIntent.customer_email,
    };

    try {
      await axios.post(
        'http://localhost:8080/sysaba/api/auth/assinatura/pago',
        payload
      );
    } catch (error) {
      console.log('err', error);
    }
  }
};
