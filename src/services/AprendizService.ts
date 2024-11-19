import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class AprendizService {
  async salvar(data: any) {
    return await http.post('/aprendizes', data);
  }

  async atualizar(data: any) {
    return await http.put('/aprendizes', data);
  }

  async buscar() {
    return await http.get('/aprendizes');
  }

  async get(id: string | null) {
    return await http.get(`/aprendizes/${id}`);
  }
}
