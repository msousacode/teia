import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class TermoService {
  async postAceiteTermo(email: string) {
    return await http.post(`/auth/termo/email/${email}`).then((res) => {
      return {
        aceite: res.data,
      };
    });
  }
}
