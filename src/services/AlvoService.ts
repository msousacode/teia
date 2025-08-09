import createHttp from './base/baseHttp';

const http = createHttp('/api');

export default class AlvoService {
  async postAlvo(data: { nome_alvo: string; tag: string | null }) {
    return await http.post('/alvos/v2/salvar', data);
  }

  async postImportarObjetivos(data: {
    aprendizId: string;
    objetivos: string[];
  }) {
    return await http.post('/alvos/v2/importar', data);
  }

  async getAlvosV2() {
    return await http.get('/alvos/v2/all');
  }

  async getAlvosImportadosV2(aprendizId: string) {
    return await http.get(`/alvos/v2/importados/all/${aprendizId}`);
  }

  async concluirAlvo(uuid: any) {
    return await http.put(`/alvos/v2/concluir/${uuid}`);
  }

  async atualizarEstrelas(data: any) {
    return await http.put('/alvos/v2/atualizar-estrelas', { mudancas: data });
  }

  async putAlvo(data: any) {
    return await http.put('/alvos', data);
  }

  async getAlvos(id: string | null) {
    return await http.get(`/alvos/all/${id}`);
  }

  async getAlvoById(id: string | null) {
    return await http.get(`/alvos/${id}`);
  }

  async getAlvosByTreinamento(uuid: any) {
    return await http.get(`/alvos/all/treinamento/${uuid}`);
  }

  async deletarAlvo(uuid: any) {
    return await http.delete(`/alvos/${uuid}`);
  }
}
