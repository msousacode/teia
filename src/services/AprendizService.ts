import { api } from 'src/boot/axios';

const token = JSON.parse(localStorage.getItem('_t') ?? '');

const config = {
  headers: {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export class AprendizService {
  async salvar(data: any) {
    try {
      const response = await api.post('/aprendizes', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async atualizar(data: any) {
    try {
      const response = await api.put('/aprendizes', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async buscar() {
    try {
      const response = await api.get('/aprendizes', config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(id: string | null) {
    try {
      const response = await api.get(`/aprendizes/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
