const stripe = require('stripe')(
  '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'
);

const axios = require('axios');

exports.handler = async (event) => {
  const endpointSecret = 'whsec_sbjMTZAZ8nUqIrnMt2bxD5FszYMJ9usR';

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
        'https://sysaba.tech/sysaba/api/auth/assinatura/pago',
        payload
      );
    } catch (error) {
      console.log('err', error);
    }

    return {
      statusCode: 200,
      body: 'Sucesso.',
    };
  }
};
