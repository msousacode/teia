import createHttp from '../base/baseHttp';

const http = createHttp('/api/auth');

export class StripeService {
  async postAprendiz(data: any) {
    return await http.post('/stripe', data);
  }

  async getUsuarioInfoStripe(email: string) {
    return await http.get(`/stripe/${email}`).then((res) => {
      return {
        stripeSubscriptionId: res.data.stripeSubscriptionId,
      };
    });
  }
}
