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

export class TreinamentoService {
  async salvar(data: any) {
    try {
      const response = await api.post('/treinamentos', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async atualizar(data: any) {
    try {
      const response = await api.put(
        `/treinamentos${data.treinamentoId}`,
        data,
        config
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async salvarAlvo(data: any) {
    try {
      const response = await api.post('/treinamentos/alvos', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      const response = await api.get('/treinamentos', config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(id: string | null) {
    try {
      const response = await api.get(`/treinamentos/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
