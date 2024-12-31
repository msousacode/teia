import createHttp from './base/baseHttp';

const http = createHttp('/api');

export class RelatorioService {
  async gerarRelatorio(uuid: string, dataInicial: string, dataFinal: string) {
    return await http.get(
      `/relatorios/aprendiz/${uuid}/dataInicio/${dataInicial}/dataFinal/${dataFinal}`
    );
  }

  async gerarRelatorioPortage(portageId: string) {
    return await http.get(`/relatorios/portage/${portageId}`);
  }

  async gerarRelatorioPortagePEI(portageId: string) {
    return await http.get(`/relatorios/portage/${portageId}/pei`);
  }

  async gerarRelatorioVBMAPP(vbmappId: string) {
    return await http.get(`/relatorios/vbmapp/${vbmappId}`);
  }

  async gerarRelatorioVBMAPPPEI(vbmappId: string) {
    return await http.get(`/relatorios/vbmapp/${vbmappId}/pei`);
  }
}
