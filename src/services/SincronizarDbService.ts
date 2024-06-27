import { db } from 'src/db';
import 'dexie-export-import';

export class SincronizarDbService {
  ultimaDataSincronismo: Date | string = '';

  inicia = () => {
    this.iniciarSincronizacao();
  };

  constructor() {
    this.consultaUltimaDataSincronismo().then((data) => {
      this.ultimaDataSincronismo = new Date(data);
    });
  }

  //ter um controle para saber quando foi o último sincronismo.
  consultaUltimaDataSincronismo = async () => {
    const res = await db.sincronizacao.toArray().then((data) => {
      return data;
    });
    return res.length > 0
      ? res[0].dataUltimaSincronizacao
      : 'Nunca sincronizado';
  };

  iniciarSincronizacao = async () => {
    if (this.isNuncaSincronizado()) {
      const blob = await db.export();
      console.log('blob', blob);

      //Enviar o blob para o servidor precisa enviar o tenant_id do usuario dono desse banco de dados enviar também a última data de atualização.

      //após enviar os dados para o servidor, atualizar a data de sincronismo.
      this.atualizaUltimaDataSinconismo();

      //this.readBlob(blob).then(console.log).catch(console.error); TODO fica comentado somente para ser usado em desenvolvimento ou testes.
    }
  };

  isNuncaSincronizado = () => {
    return (
      this.ultimaDataSincronismo === 'Nunca sincronizado' ||
      this.ultimaDataSincronismo === ''
    );
  };

  readBlob(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result as string);
      };
      reader.onerror = function () {
        reject(reader.error);
      };
      reader.readAsText(blob);
    });
  }

  atualizaUltimaDataSinconismo = async () => {
    const data = new Date();
    await db.sincronizacao.clear();
    await db.sincronizacao.add({ dataUltimaSincronizacao: data });
  };
}
