import { api } from 'src/boot/axios';

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
    return api
      .post('/auth/usuarios', usuario, config)
      .then(() => {
        return { status: 200 };
      })
      .catch(() => {
        return { status: 500 };
      });
  }

  async login(auth: Auth) {
    return api
      .post('/auth/login', auth, config)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error.status;
      });
  }
}
