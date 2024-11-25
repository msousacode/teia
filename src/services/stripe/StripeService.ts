import createHttp from '../base/baseHttp';

const http = createHttp('/api/auth');

export class StripeService {
  async postAprendiz(data: any) {
    return await http.post('/stripe', data);
  }
}
