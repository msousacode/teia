import createHttp from './base/baseHttp';

const http = createHttp('/api/ablls');

export class AbllsService {
  async post(payload: any) {
    return await http.post('/avaliacoes', payload);
  }
}
