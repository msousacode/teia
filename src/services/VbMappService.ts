import { BarreiraList } from 'src/pages/avaliacoes/model/barreira.model';
import createHttp from './base/baseHttp';

const http = createHttp('/api/vbmapp');

export class VbMappService {
  async postAvaliacao(object: any) {
    return await http
      .post('/avaliacoes', object)
      .then((data) => {
        return {
          data: data.data,
          status: 200,
        };
      })
      .catch(() => {
        return {
          data: null,
          status: 500,
        };
      });
  }

  async postColetaAvaliacao(object: any) {
    return await http.post('/coletas', object);
  }

  async postColetaBarreira(paylod: BarreiraList, aprendizId: string) {
    return await http.post(`/aprendiz/${aprendizId}/barreiras/coletas`, paylod);
  }

  async getVbMappAvaliacaoConfigTelaById(id: string | null) {
    return await http.get(`/config-tela/${id}`).then((data) => {
      return {
        uuid: data.data.vbMappId,
        niveis_coleta: data.data.niveisColeta,
      };
    });
  }

  async getVbMappAvaliacaoByAprendizId(id: string | null) {
    return await http.get(`/aprendiz/${id}`);
  }

  async getColetasRespondidas(vbmappUuid: string) {
    return await http.get(`/coletas-respondidas/${vbmappUuid}`);
  }

  async getColetaPontuacoes(avaliacaoId: string) {
    return await http.get(`/chart/milestones/${avaliacaoId}`);
  }
}
