import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class AnotacaoService {
  async postAnotacao(data: any) {
    return await http.post('/anotacoes', data);
  }

  async putAnotacao(data: any) {
    return await http.put('/anotacoes', data);
  }

  async getAnotacoes(
    atendimentoId: string | string[],
    treinamentoId: string | string[]
  ) {
    return await http.get(
      `/anotacoes/atendimento/${atendimentoId}/treinamento/${treinamentoId}`
    );
  }

  async getAnotacaoById(id: string | null) {
    return await http.get(`/anotacoes/${id}`);
  }

  async deleteAnotacaoById(id: string | null) {
    return await http.delete(`/anotacoes/${id}`);
  }
}
