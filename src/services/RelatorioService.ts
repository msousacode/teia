import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class RelatorioService {
  async gerarRelatorio(uuid: string, dataInicial: string, dataFinal: string) {
    return await http.get(
      `/relatorios/aprendiz/${uuid}/dataInicio/${dataInicial}/dataFinal/${dataFinal}`
    );
  }
}
