import createHttp from './base/baseHttp';

const http = createHttp('/api');

export type UsuarioInfo = {
  documento: string;
  email: string;
  full_name: string;
};

export class UsuarioService {
  async getUsuarioInfo() {
    return await http.get('/user-info').then((res) => {
      return {
        usuarioId: res.data.usuarioId,
        fullName: res.data.fullName,
        email: res.data.email,
        termoAceite: res.data.termoAceite,
        documento: res.data.documento,
        perfil: res.data.perfil,
      };
    });
  }

  async putPerfil(perfil: UsuarioInfo) {
    return await http.put('/user-info', perfil);
  }
}
