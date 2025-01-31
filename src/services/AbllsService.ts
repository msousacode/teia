import createHttp from './base/baseHttp';

const http = createHttp('/api/ablls');

export class AbllsService {
  async post(payload: any) {
    return await http.post('/avaliacoes', payload);
  }

  async postColetas(
    payload: any,
    usuarioId: string,
    abllsId: string | string[],
    habilidade: number
  ) {
    return await http.post(
      `/usuario/${usuarioId}/avaliacao/${abllsId}/habilidade/${habilidade}`,
      payload
    );
  }

  async getColetasRespondidas(abllsId: string | string[]) {
    return await http.get(`/coletas-respondidas/${abllsId}`);
  }

  async getColetaPontuacoes(avaliacaoId: string, habilidade: number) {
    return await http.get(
      `/chart/pontuacoes/${avaliacaoId}/habilidade/${habilidade}`
    );
  }
}
