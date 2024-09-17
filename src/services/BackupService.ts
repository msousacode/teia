import 'dexie-export-import';
import useSupabaseApi from 'src/composables/UseSupabaseApi';
import { useQuasar } from 'quasar';
import { db } from 'src/db';
import Dexie from 'dexie';
import { useRouter } from 'vue-router';

//Fica comentado somente para ser usado em desenvolvimento ou testes.
//this.readBlob(blob).then(console.log).catch(console.error);

export class BackupService {
  supabase = useSupabaseApi();

  ultimaDataSincronismo: Date | string = '';

  $q = useQuasar();

  router = useRouter();

  fazerBackup = () => {
    this.iniciarBackup();
  };

  iniciarBackup = async () => {
    this.$q.loading.show();
    let blob = null;
    try {
      blob = await db.export();
    } catch (e) {
      console.error(e);
    }

    this.supabase
      .bucketUpload(blob)
      .then(() => {
        this.$q.loading.hide();
        this.$q.notify({
          message: 'Backup concluído com sucesso!',
          color: 'positive',
          position: 'center',
          timeout: 2000,
        });
      })
      .catch(() => {
        this.$q.loading.hide();
        this.$q.notify({
          message: 'Ocorreu algum erro. Não foi possível fazer o backup.',
          color: 'negative',
          position: 'center',
          icon: 'report_problem',
          timeout: 2000,
        });
      });
  };

  restaurarBackup = async (fileNameBancoDemonstracao?: string) => {
    if (navigator.onLine) {
      this.$q.loading.show();
      const user = await this.supabase.getUserAuth();

      const email = user?.data.user?.email as string;

      if (email !== undefined) {
        try {
          let fileName;

          if (fileNameBancoDemonstracao != null) {
            fileName = await this.supabase.getUltimoBackup(
              email.trim().toLocaleLowerCase()
            );
          } else {
            fileName = fileNameBancoDemonstracao;
          }

          const data = await this.supabase.getObjectBucket(fileName);

          await this.deleteDB().then(async () => {
            await db
              .import(data!)
              .then(() => {
                this.$q.loading.hide();

                if (!fileNameBancoDemonstracao) {
                  this.$q.notify({
                    message: 'Restauração concluída com sucesso!',
                    color: 'positive',
                    position: 'center',
                    timeout: 2000,
                  });
                }
                this.router.replace({ name: 'relatorios' });
              })
              .catch((e) => {
                console.error(e);
                this.$q.loading.hide();
                this.$q.notify({
                  message: 'Ocorreu algum erro. Não foi possível restaurar.',
                  color: 'negative',
                  position: 'center',
                  icon: 'report_problem',
                  timeout: 2000,
                });
              });
          });
        } catch (e) {
          console.error(e);
          this.$q.loading.hide();
          this.$q.notify({
            message: 'Ocorreu algum erro. Não foi possível restaurar.',
            color: 'negative',
            position: 'center',
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
        position: 'center',
        icon: 'report_problem',
        timeout: 2000,
      });
    }
  };

  deleteDB = async () => {
    Dexie.delete('sysabaDB').catch(() => {
      console.error('Could not delete database');
    });
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
