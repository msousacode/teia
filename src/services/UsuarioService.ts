import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class UsuarioService {
  async getUsuarioInfo() {
    return await http.get('/user-info');
  }
}
