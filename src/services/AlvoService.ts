import createHttp from './base/baseHttp';

const http = createHttp('/api');

export default class AlvoService {
  async postAlvo(data: { nome_alvo: string }) {
    return await http.post('/alvos/v2/salvar', data);
  }

  async getAlvosV2() {
    return await http.get('/alvos/v2/all');
  }

  async putAlvo(data: any) {
    return await http.put('/alvos', data);
  }

  async getAlvos(id: string | null) {
    return await http.get(`/alvos/all/${id}`);
  }

  async getAlvoById(id: string | null) {
    return await http.get(`/alvos/${id}`);
  }

  async getAlvosByTreinamento(uuid: any) {
    return await http.get(`/alvos/all/treinamento/${uuid}`);
  }
}
