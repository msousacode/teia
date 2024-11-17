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
      const response = await api.put('/treinamentos', data, config);
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

  async salvarAlvo(data: any) {
    try {
      const response = await api.post('/alvos', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAlvoAll(id: string | null) {
    try {
      const response = await api.get(`/alvos/all/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getAlvo(id: string | null) {
    try {
      const response = await api.get(`/alvos/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async buscarAlvosPorTreinamento(uuid: any) {
    try {
      const response = await api.get(`/alvos/all/treinamento/${uuid}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
