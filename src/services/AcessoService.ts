import createHttp from './base/baseHttp';

const http = createHttp('/api');

export interface Usuario {
  full_name: string;
  email: string;
  banco_demonstracao: string;
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
  async criarNovoUsuario(usuario: Usuario) {
    return http.post('/auth/usuarios', usuario, config);
  }

  async login(auth: Auth) {
    return http.post('/auth/login', auth, config);
  }

  async subscriptionInfoByEmail(email: string) {
    return http.get(`/auth/usuarios/subscription/${email}`);
  }
}
