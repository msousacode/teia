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

  async salvarAlvo(data: any) {
    return await http.post('/alvos', data);
  }

  async getAlvoAll(id: string | null) {
    return await http.get(`/alvos/all/${id}`);
  }

  async getAlvo(id: string | null) {
    return await http.get(`/alvos/${id}`);
  }

  async buscarAlvosPorTreinamento(uuid: any) {
    return await http.get(`/alvos/all/treinamento/${uuid}`);
  }
}
