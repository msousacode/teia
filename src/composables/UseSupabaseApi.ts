import useSupabase from '../../src/boot/supabase';

export default function useSupabaseApi() {
  const supabase = useSupabase().supabase;

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
      const fileName = new Date().getTime().toString();
      const { data, error } = await supabase.storage
        .from('backups')
        .upload(fileName, file);
      if (error) throw error;
      return data;
    } catch (error) {
      console.log('error', error);
    }
  };

  return {
    post,
    put,
    getByEmail,
    bucketUpload,
  };
}
