import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class AtendimentoService {
  async postAtendimento(data: any) {
    return await http.post(
      `/atendimentos/aprendiz/${data.aprendiz_uuid_fk}`,
      data
    );
  }

  async putAtendimento(data: any) {
    return await http.put('/atendimentos', data);
  }

  async getAtendimentos() {
    return await http.get('/atendimentos');
  }

  async getAtendimentoById(id: string | null) {
    return await http.get(`/atendimentos/${id}`);
  }
}
