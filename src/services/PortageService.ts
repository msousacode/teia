import createHttp from './base/baseHttp';

const http = createHttp('/api/portage');

export class PortageService {
  async postAvaliacao(object: any) {
    return await http
      .post('/avaliacoes', object)
      .then((data) => {
        return {
          data: data.data,
          status: 200,
        };
      })
      .catch(() => {
        return {
          data: null,
          status: 500,
        };
      });
  }

  async postColetaAvaliacao(object: any, usuarioId: string) {
    return await http.post(`/usuario/${usuarioId}/coletas`, object);
  }

  async getPortageAvaliacaoConfigTelaById(id: string | null) {
    return await http.get(`/config-tela/${id}`).then((data) => {
      return {
        uuid: data.data.portageId,
        idades_coleta: data.data.idadesColeta,
      };
    });
  }

  async getVbMappAvaliacaoByAprendizId(id: string | null) {
    return await http.get(`/aprendiz/${id}`);
  }

  async getColetasRespondidas(vbmappUuid: string) {
    return await http.get(`/coletas-respondidas/${vbmappUuid}`);
  }

  async getColetaPontuacoes(avaliacaoId: string) {
    return await http.get(`/chart/pontuacoes/${avaliacaoId}`);
  }
}
