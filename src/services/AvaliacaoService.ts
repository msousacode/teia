import createHttp from './base/baseHttp';

const http = createHttp('/api/avaliacoes');

export class AvaliacaoService {
  async getAvaliacoes(id: string | null) {
    return await http.get(`/aprendiz/${id}`);
  }
}
