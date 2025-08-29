import Stripe from 'stripe';

import { config } from '../../config';
import { StripeService } from './StripeService';
import { AssinaturaService } from '../AssinaturaService';

const stripeService = new StripeService();
const assinaturaService = new AssinaturaService();

export const stripe = new Stripe(config.stripe.secretKey || '', {
  httpClient: Stripe.createFetchHttpClient(),
});

export const getStripeCustomerByEmail = async (email: string) => {
  const customers = await stripe.customers.list({ email });
  return customers.data[0];
};

export const createStripeCustomer = async (input: {
  name?: string;
  email: string;
}) => {
  const customer = await getStripeCustomerByEmail(input.email);
  if (customer) return customer;

  const createdCustomer = await stripe.customers.create({
    email: input.email.toLowerCase().trim(),
    name: input.name,
  });

  const createdCustomerSubscription = await stripe.subscriptions.create({
    customer: createdCustomer.id,
    items: [{ price: config.stripe.plans.pro.priceId }],
  });

  const object = {
    stripeCustomerId: createdCustomer.id,
    stripeSubscriptionId: createdCustomerSubscription.id,
    stripeSubscriptionStatus: createdCustomerSubscription.status,
    stripePriceId: config.stripe.plans.pro.priceId,
    email: createdCustomer.email,
  };

  await stripeService.postCustomer(object);

  return createdCustomer;
};

export const createCheckoutSession = async (
  userEmail: string,
  tipoPlano: 'started' | 'profissional' | 'clinic'
) => {
  try {
    const customer = await getStripeCustomerByEmail(
      userEmail.toLowerCase().trim()
    );

    let session;

    if (tipoPlano === 'started') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        client_reference_id: customer.id,
        customer_email: userEmail.toLowerCase().trim(),
        success_url: `${process.env.API_URL}#/sucesso`,
        cancel_url: `${process.env.API_URL}#/falha`,
        line_items: [
          {
            price: config.stripe.plans.started.priceId,
            quantity: 1,
          },
        ],
      });
    } else if (tipoPlano === 'profissional') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        client_reference_id: customer.id,
        customer_email: userEmail.toLowerCase().trim(),
        success_url: `${process.env.API_URL}#/sucesso`,
        cancel_url: `${process.env.API_URL}#/falha`,
        line_items: [
          {
            price: config.stripe.plans.profisional.priceId,
            quantity: 1,
          },
        ],
      });
    } else if (tipoPlano === 'clinic') {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        client_reference_id: customer.id,
        customer_email: userEmail.toLowerCase().trim(),
        success_url: `${process.env.API_URL}#/sucesso`,
        cancel_url: `${process.env.API_URL}#/falha`,
        line_items: [
          {
            price: config.stripe.plans.clinic.priceId,
            quantity: 1,
          },
        ],
      });
    }

    if (session) return { url: session.url };
  } catch (error) {
    console.error(error);
    throw new Error('Error to create checkout session');
  }
};

export const handleProcessWebhookUpdatedSubscription = async (event: {
  object: Stripe.Subscription;
}) => {
  const stripeCustomerId = event.object.customer as string;
  const stripeSubscriptionId = event.object.id as string;
  const stripeSubscriptionStatus = event.object.status;
  const stripePriceId = event.object.items.data[0].price.id;

  const userExists = await prisma.user.findFirst({
    where: {
      OR: [
        {
          stripeSubscriptionId,
        },
        {
          stripeCustomerId,
        },
      ],
    },
    select: {
      id: true,
    },
  });

  if (!userExists) {
    throw new Error('user of stripeCustomerId not found');
  }

  await prisma.user.update({
    where: {
      id: userExists.id,
    },
    data: {
      stripeCustomerId,
      stripeSubscriptionId,
      stripeSubscriptionStatus,
      stripePriceId,
    },
  });
};

type Plan = {
  priceId: string;
  quota: {
    TASKS: number;
  };
};

type Plans = {
  [key: string]: Plan;
};

export const getPlanByPrice = (priceId: string) => {
  const plans: Plans = config.stripe.plans;

  const planKey = Object.keys(plans).find(
    (key) => plans[key].priceId === priceId
  ) as keyof Plans | undefined;

  const plan = planKey ? plans[planKey] : null;

  if (!plan) {
    throw new Error(`Plan not found for priceId: ${priceId}`);
  }

  return {
    name: planKey,
    quota: plan.quota,
  };
};

export const getUserCurrentPlan = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripePriceId: true,
    },
  });

  if (!user || !user.stripePriceId) {
    throw new Error('User or user stripePriceId not found');
  }

  const plan = getPlanByPrice(user.stripePriceId);

  const tasksCount = await prisma.todo.count({
    where: {
      userId,
    },
  });

  const availableTasks = plan.quota.TASKS;
  const currentTasks = tasksCount;
  const usage = (currentTasks / availableTasks) * 100;

  return {
    name: plan.name,
    quota: {
      TASKS: {
        available: availableTasks,
        current: currentTasks,
        usage,
      },
    },
  };
};

export const getSubscriptionByCustomer = async (customerId: string) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    if (subscriptions.data.length === 0) {
      throw new Error('No active subscription found for customer');
    }

    return subscriptions.data[0];
  } catch (error) {
    console.error('Error getting subscription by customer:', error);
    throw new Error('Error retrieving customer subscription');
  }
};

export const cancelSubscriptionImmediate = async (subscriptionId: string) => {
  try {
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscriptionId
    );

    await stripeService.notifySubscriptionCancellation({
      subscriptionId,
      cancellationType: 'immediate',
      status: canceledSubscription.status,
    });

    return {
      success: true,
      subscription: canceledSubscription,
      message: 'Subscription canceled immediately',
    };
  } catch (error) {
    console.error('Error canceling subscription immediately:', error);
    throw new Error('Failed to cancel subscription immediately');
  }
};

export const cancelSubscriptionAtPeriodEnd = async (subscriptionId: string) => {
  try {
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );

    await stripeService.notifySubscriptionCancellation({
      subscriptionId,
      cancellationType: 'at_period_end',
      status: updatedSubscription.status,
      cancelAt: updatedSubscription.cancel_at,
    });

    const user = JSON.parse(localStorage.getItem('user'));
    assinaturaService.confirmarCancelamento(user.id);

    return {
      success: true,
      subscription: updatedSubscription,
      message: 'Subscription will be canceled at the end of the current period',
      cancelAt: updatedSubscription.cancel_at,
    };
  } catch (error) {
    console.error('Error scheduling subscription cancellation:', error);
    throw new Error('Failed to schedule subscription cancellation');
  }
};

export const reactivateSubscription = async (subscriptionId: string) => {
  try {
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: false,
      }
    );

    await stripeService.notifySubscriptionReactivation({
      subscriptionId,
      status: updatedSubscription.status,
    });

    return {
      success: true,
      subscription: updatedSubscription,
      message: 'Subscription reactivated successfully',
    };
  } catch (error) {
    console.error('Error reactivating subscription:', error);
    throw new Error('Failed to reactivate subscription');
  }
};
