//import useSupabase from 'src/boot/supabase';

export default function loginService() {
  const login = async (email: string) => {
    //const { data, error } = await useSupabase()
    /* .supabase.from('usuario')
      .select('*')
      .eq('email', email);
    if (error) throw error; */
    return email;
  };

  const register = async (usuario: any) => {
    // Esta linha pausa a execução até que cadastrarClientAsaas seja resolvido
    /* const id = await this.service.cadastrarClientAsaas(usuario);
    usuario.assas_customer_id = id;
    // Esta linha só será executada após a resolução de cadastrarClientAsaas
    const { data, error } = await useSupabase()
      .supabase.from('usuario')
      .insert([
        {
          ...usuario,
        },
      ]);
    if (error) throw error; */

    return usuario;
  };

  return { login, register };
}
