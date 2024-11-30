import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class UsuarioService {
  async getUsuarioInfo() {
    return await http.get('/user-info').then((res) => {
      return {
        usuarioId: res.data.usuarioId,
        fullName: res.data.fullName,
        email: res.data.email,
        termoAceite: res.data.termoAceite,
      };
    });
  }
}
