import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class ColetaService {
  async postColeta(data: any) {
    return await http.post('/coletas', data);
  }

  async atualizar(data: any) {
    return await http.put('/coletas', data);
  }

  async buscar() {
    return await http.get('/coletas');
  }

  async get(id: string | null) {
    return await http.get(`/coletas/${id}`);
  }
}
