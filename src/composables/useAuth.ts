import useSupabase from 'src/boot/supabase';
import useNotify from './UseNotify';

export default function authService() {
  const { supabase } = useSupabase();

  const login = async (email: any, password: any) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      localStorage.setItem('user', JSON.stringify(data.user));
      if (error) throw error;
      return data.user;
    } catch (error) {
      useNotify().error('Erro ao logar usuário: SUPA_000');
      throw error;
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
