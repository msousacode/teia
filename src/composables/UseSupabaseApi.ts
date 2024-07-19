import useSupabase from '../../src/boot/supabase';
import { v4 as uuid } from 'uuid';

type BackupLog = {
  nome_arquivo: string;
  user_uuid: string;
};

//Como verificar se o usuário esta autenticado?
//console.log('form', supabase.auth.getUser());

export default function useSupabaseApi() {
  const supabase = useSupabase().supabase;

  const getUserAuth = async () => {
    return supabase.auth.getUser();
  };

  const getByEmail = async (table: string, email: string) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('email', email.trim());
    if (error) throw error;
    return data[0];
  };

  const post = async (table: string, form: any) => {
    const { data, error } = await supabase.from(table).insert([
      {
        ...form,
      },
    ]);
    if (error) throw error;
    return data;
  };

  const put = async (table: string, form: any) => {
    const { data, error } = await supabase
      .from(table)
      .update({ ...form })
      .match({ id: form.id });
    if (error) throw error;
    return data;
  };

  const bucketUpload = async (file: any) => {
    try {
      const fileName = uuid();
      const { data, error } = await supabase.storage
        .from('backups')
        .upload(fileName, file);
      if (error) throw error;

      const userUuid = (await supabase.auth.getUser()).data.user?.id as string;

      registrarBackupLog({ nome_arquivo: fileName, user_uuid: userUuid });

      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  const getObjectBucket = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('backups')
        .createSignedUrl(fileName, 60);

      if (error) throw error;

      const response = await fetch(data.signedUrl);
      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.log('error', error);
    }
  };

  const registrarBackupLog = async (log: BackupLog) => {
    post('backups_realizados_log', log);
  };

  const getUltimoBackup = async (userUuid: string) => {
    console.log(userUuid);
    const { data, error } = await supabase
      .from('backups_realizados_log')
      .select('*')
      .eq('user_uuid', userUuid.trim())
      .order('created_at', { ascending: false }) // Ordena por data_criacao em ordem decrescente
      .limit(1); // Limita os resultados a um
    console.log('data', data);
    if (error) throw error;
    return data[0].nome_arquivo;
  };

  return {
    post,
    put,
    getByEmail,
    bucketUpload,
    getObjectBucket,
    registrarBackupLog,
    getUserAuth,
    getUltimoBackup,
  };
}
