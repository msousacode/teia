import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class ColetaService {
  async postColeta(data: any) {
    return await http.post('/coletas', data);
  }

  async putColeta(data: any) {
    return await http.put('/coletas', data);
  }

  async getColetas(id: string | null) {
    return await http.get(`/coletas/treinamento/${id}`);
  }

  async getColeta(id: string | null) {
    return await http.get(`/coleta/${id}`);
  }
}
