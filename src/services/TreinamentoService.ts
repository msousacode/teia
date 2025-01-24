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

  async getTreinamentosBase(usuarioId: string) {
    return await http.get(`/treinamentos/base/usuario/${usuarioId}`);
  }

  async importarTreinamentos(data: string[], usuarioId: string) {
    return await http.post(`/treinamentos/base/usuario/${usuarioId}`, data);
  }
}
