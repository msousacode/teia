import { Usuario } from './AcessoService';
import createHttp from './base/baseHttp';

const http = createHttp('/api');

const config = {
  headers: {
    accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'content-type': 'application/json',
  },
};
export class ProfissionalService {
  async getProfissionais(usuarioId: string) {
    return await http.get(`/profissionais/tenant/${usuarioId}`);
  }

  async getByEmail(email: string | string[]) {
    return await http.get(`/profissionais/${email}`);
  }

  async atualizar(usuario: Usuario, email: string) {
    return http.put(`/profissionais/${email}`, usuario, config);
  }
}
