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
    if (navigator.onLine) {
      const user = await this.supabase.getUserAuth();

      const userUuid = user?.data.user?.id as string;

      if (userUuid !== undefined) {
        try {
          const fileName = await this.supabase.getUltimoBackup(userUuid);

          const data = await this.supabase.getObjectBucket(fileName);

          await db
            .import(data)
            .then(() => {
              this.$q.notify({
                message: 'Restauração concluída com sucesso!',
                color: 'positive',
                position: 'bottom',
                //icon: 'report_problem',
                timeout: 2000,
              });
            })
            .catch((e) => {
              console.error(e);
              this.$q.notify({
                message: 'Ocorreu algum erro. Não foi possível restaurar.',
                color: 'negative',
                position: 'bottom',
                icon: 'report_problem',
                timeout: 2000,
              });
            });
        } catch (e) {
          console.error(e);
          this.$q.notify({
            message: 'Ocorreu algum erro. Não foi possível restaurar.',
            color: 'negative',
            position: 'bottom',
            icon: 'report_problem',
            timeout: 2000,
          });
        }
      }
    } else {
      this.$q.notify({
        message:
          'Sem conexão com a internet. Ative a internet e tente novamente.',
        color: 'negative',
        position: 'bottom',
        icon: 'report_problem',
        timeout: 2000,
      });
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
