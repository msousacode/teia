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

export class ColetaService {
  async salvar(data: any) {
    try {
      const response = await api.post('/coletas', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async atualizar(data: any) {
    try {
      const response = await api.put('/coletas', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async buscar() {
    try {
      const response = await api.get('/coletas', config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(id: string | null) {
    try {
      const response = await api.get(`/coletas/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
