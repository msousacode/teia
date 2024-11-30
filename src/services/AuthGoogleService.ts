import createHttp from './base/baseHttp';

const http = createHttp('');

export class AuthGoogleService {
  async getAuthGogle() {
    return await http.get('/oauth2/authorization/google');
  }
}
