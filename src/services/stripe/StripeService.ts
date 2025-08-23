import createHttp from '../base/baseHttp';

const http = createHttp('/api/auth');

export class StripeService {
  async postCustomer(data: any) {
    return await http.post('/stripe', data);
  }

  async getUsuarioInfoStripe(email: string) {
    return await http.get(`/stripe/${email}`).then((res) => {
      return {
        stripeSubscriptionId: res.data.stripeSubscriptionId,
      };
    });
  }

  async notifySubscriptionCancellation(data: {
    subscriptionId: string;
    cancellationType: 'immediate' | 'at_period_end';
    status: string;
    cancelAt?: number | null;
  }) {
    return await http.patch('/stripe/cancel', data);
  }

  async notifySubscriptionReactivation(data: {
    subscriptionId: string;
    status: string;
  }) {
    return await http.patch('/stripe/reactivate', data);
  }
}
