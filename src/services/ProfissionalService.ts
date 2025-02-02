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

interface Profissional {
  usuario_id: string;
  perfil: string;
  full_name: string;
  email: string;
}
export class ProfissionalService {
  async getProfissionais(usuarioId: string): Promise<Profissional[]> {
    return await http.get(`/profissionais/tenant/${usuarioId}`);
  }

  async getByEmail(email: string | string[]) {
    return await http.get(`/profissionais/${email}`);
  }

  async atualizar(usuario: Usuario, email: string) {
    return http.put(`/profissionais/${email}`, usuario, config);
  }
}
