import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class TreinamentoService {
  async postTreinamento(data: any) {
    return await http.post('/treinamentos', data);
  }

  async putTreinamento(data: any) {
    return await http.put('/treinamentos', data);
  }

  async getTreinamentos() {
    return await http.get('/treinamentos');
  }

  async getTreinamentoById(id: string | null) {
    return await http.get(`/treinamentos/${id}`);
  }

  async getTreinamentosBase() {
    return await http.get('/treinamentos/base');
  }

  async importarTreinamentos(data: string[]) {
    return await http.post('/treinamentos', data);
  }
}
