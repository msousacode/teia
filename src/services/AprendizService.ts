import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class AprendizService {
  async postAprendiz(data: any) {
    return await http.post('/aprendizes', data);
  }

  async putAprendiz(data: any) {
    return await http.put('/aprendizes', data);
  }

  async getAprendizes() {
    return await http.get('/aprendizes');
  }

  async getAprendizById(id: string | null) {
    return await http.get(`/aprendizes/${id}`);
  }

  async deleteAprendizById(id: string | null) {
    return await http.delete(`/aprendizes/${id}`);
  }
}
