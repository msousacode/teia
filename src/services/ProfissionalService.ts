import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class ProfissionalService {
  async getProfissionais(usuarioId: string) {
    return await http.get(`/profissionais/tenant/${usuarioId}`);
  }

  async getByEmail(email: string | string[]) {
    return await http.get(`/profissionais/${email}`);
  }
}
