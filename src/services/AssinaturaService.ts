import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class AssinaturaService {
  async verifyCheckout(email: string) {
    return http.get(`/auth/assinatura/verify/${email}`);
  }

  async confirmarCancelamento(userId: string) {
    return http.put(`/auth/assinatura/userId/${userId}/cancel`);
  }
}
