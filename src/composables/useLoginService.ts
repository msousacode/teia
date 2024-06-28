import useSupabase from 'src/boot/supabase';
//import { ref } from 'vue';

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
//const user = ref(null);

export default function loginService() {
  const { supabase } = useSupabase();

  const login = async (email: string) => {
    //const { data, error } = await useSupabase()
    /* .supabase.from('usuario')
      .select('*')
      .eq('email', email);
    if (error) throw error; */
    return email;
  };

  const register = async (email: any, password: any) => {
    const { user, error } = await supabase.auth.signUp({ email, password });
    console.log(user);
    if (error) throw error;
    return user;
  };

  return { login, register };
}
