import useSupabase from 'src/boot/supabase';
import useNotify from './UseNotify';
import { Provider } from 'src/pages/acesso/LoginSocialPage.vue';

export default function authService() {
  const { supabase } = useSupabase();

  const login = async (email: any, password: any, provider: Provider) => {
    if (provider === 'google') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `https://sysaba.netlify.app/relatorios`,
        },
      });

      if (error) throw error;

      return data;
    }

    /*
    if (provider === 'facebook') {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });

      console.log('data : ', data);
      if (error) throw error;
      return data;
    }
  */
    if (provider === 'normal') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data.user;
    }
  };

  const register = async (email: any, password: any) => {
    try {
      await supabase.auth.signUp({ email, password });
    } catch (error) {
      useNotify().error('Erro ao registrar usuário: SUPA_001');
      throw error;
    }
  };

  /**
   * Check if the user is logged in or not
   */
  const isLoggedIn = () => {
    return !!localStorage.getItem('user');
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
