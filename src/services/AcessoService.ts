import createHttp from './base/baseHttp';

const http = createHttp('/api');

export interface Usuario {
  full_name: string;
  email: string;
  perfil: string;
  senha: string;
}

export interface Auth {
  username: string;
  password: string;
}

const config = {
  headers: {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
};
export class AcessoService {
  async criarNovoUsuario(usuario: Usuario, usuarioId?: string) {
    if (usuarioId != undefined) {
      return http.post(`/auth/usuarios/tenant/${usuarioId}`, usuario, config);
    } else {
      return http.post('/auth/usuarios', usuario, config);
    }
  }

  async login(auth: Auth) {
    return http.post('/auth/login', auth, config);
  }

  async subscriptionInfoByEmail(email: string) {
    return http.get(`/auth/usuarios/subscription/${email}`);
  }

  async esqueciMinhaSenha(email: string) {
    return http.get(`/auth/esqueci/${email}`);
  }

  resetPassword(payload: {
    senha: string;
    userId: string | string[];
    keyId: string | string[];
  }): { status: any } | PromiseLike<{ status: any }> {
    return http.post('/auth/nova-senha', payload, config);
  }
}
