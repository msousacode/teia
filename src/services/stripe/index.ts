import Stripe from 'stripe';

import { config } from '../../config';
import { StripeService } from './StripeService';

const stripeService = new StripeService();

export const stripe = new Stripe(config.stripe.secretKey || '', {
  httpClient: Stripe.createFetchHttpClient(),
});

export const createStripeCustomer = async (input: {
  name?: string;
  email: string;
}) => {
  const createdCustomer = await stripe.customers.create({
    email: input.email,
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

export const createCheckoutSession = async (userEmail: string) => {
  try {
    const customer = await createStripeCustomer({
      email: userEmail.toLocaleLowerCase().trim(),
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      client_reference_id: customer.id,
      success_url: `${process.env.API_URL}#/sucesso`,
      cancel_url: `${process.env.API_URL}#/falha`,
      line_items: [
        {
          price: config.stripe.plans.pro.priceId,
          quantity: 1,
        },
      ],
    });

    return {
      url: session.url,
    };
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
