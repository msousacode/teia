import createHttp from './base/baseHttp';

const http = createHttp('/api/vbmapp');

export class VbMappService {
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

  async getVbMappAvaliacaoConfigTelaById(id: string | null) {
    return await http.get(`/config-tela/${id}`).then((data) => {
      return {
        uuid: data.data.vbMappId,
        niveis_coleta: data.data.niveisColeta,
      };
    });
  }
}
