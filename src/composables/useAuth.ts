import useSupabase from 'src/boot/supabase';
import { ref } from 'vue';
import useNotify from './UseNotify';

// o usuário é definido fora da função useAuthUser para que atue como um estado global
// e sempre se refira a um único usuário
const user = ref<any>(null);

export default function authService() {
  const { supabase } = useSupabase();

  const login = async (email: any, password: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      user.value = data.user;
      if (error) throw error;
      return data.user;
    } catch (error) {
      useNotify().error('Erro ao logar usuário: SUPA_000');
      throw error;
    }
  };

  const register = async (email: any, password: any) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      user.value = data.user || null;
      if (error) throw error;
      return data.user;
    } catch (error) {
      useNotify().error('Erro ao registrar usuário: SUPA_001');
      throw error;
    }
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!user.value;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  /**
   * Send user an email to reset their password
   * (ie. support "Forgot Password?")
   */
  const sendPasswordRestEmail = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return data;
  };

  const resetPassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
    return data.user;
  };

  return {
    login,
    register,
    logout,
    isLoggedIn,
    sendPasswordRestEmail,
    resetPassword,
  };
}
