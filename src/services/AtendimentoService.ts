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

export class AtendimentoService {
  async salvar(data: any) {
    debugger;
    try {
      const response = await api.post(
        `/atendimentos/aprendiz/${data.aprendiz_uuid_fk}`,
        data,
        config
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async atualizar(data: any) {
    try {
      const response = await api.put('/atendimentos', data, config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async buscar() {
    try {
      const response = await api.get('/atendimentos', config);
      return response;
    } catch (error) {
      return error;
    }
  }

  async get(id: string | null) {
    try {
      const response = await api.get(`/atendimentos/${id}`, config);
      return response;
    } catch (error) {
      return error;
    }
  }
}
