import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class VbMappService {
  async postAvaliacao(object: any) {
    return await http
      .post('/vbmapp/avaliacoes', object)
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
}
