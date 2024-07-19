import { db } from 'src/db';
import 'dexie-export-import';
import useSupabaseApi from 'src/composables/UseSupabaseApi';
import { useQuasar } from 'quasar';

//Fica comentado somente para ser usado em desenvolvimento ou testes.
//this.readBlob(blob).then(console.log).catch(console.error);

export class BackupService {
  supabase = useSupabaseApi();

  ultimaDataSincronismo: Date | string = '';

  $q = useQuasar();

  fazerBackup = () => {
    this.iniciarBackup();
  };

  constructor() {
    this.consultaUltimaDataSincronizacao().then((data) => {
      this.ultimaDataSincronismo = new Date(data);
    });
  }

  //ter um controle para saber quando foi o último sincronismo.
  consultaUltimaDataSincronizacao = async () => {
    const res = await db.sincronizacao.toArray().then((data) => {
      return data;
    });
    return res.length > 0
      ? res[0].dataUltimaSincronizacao
      : 'Nunca sincronizado';
  };

  iniciarBackup = async () => {
    let blob = null;
    try {
      blob = await db.export();
      this.$q.loading.hide();
    } catch (e) {
      console.error(e);
    }

    this.supabase.bucketUpload(blob);
  };

  restaurarBackup = async () => {
    const data = await this.supabase.getObjectBucket('1721338442210');
    try {
      await db.import(data);
    } catch (e) {
      console.error(e);
    }
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
}
