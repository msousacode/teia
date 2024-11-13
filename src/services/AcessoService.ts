import { api } from 'src/boot/axios';

export interface Usuario {
  full_name: string;
  email: string;
  banco_demonstracao: string;
}

const config = {
  headers: {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    //access_token: process.env.ASSAS_KEY,
    'content-type': 'application/json',
  },
};
export class AcessoService {
  async criarNovoUsuario(usuario: Usuario) {
    return api
      .post('/usuarios', usuario, config)
      .then((data) => {
        return data.status;
      })
      .catch((error) => {
        return error.status;
      });
  }
}
