import useSupabase from 'src/boot/supabase';

export default function authService() {
  const { supabase } = useSupabase();

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
    logout,
    isLoggedIn,
    sendPasswordRestEmail,
    resetPassword,
  };
}
