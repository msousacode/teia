import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class TreinamentoService {
  async postAlvo(data: any) {
    return await http.post('/alvos', data);
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
