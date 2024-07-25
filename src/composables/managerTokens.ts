import { jwtDecode } from 'jwt-decode';

type localStorageKey = 'sb-admyhroxjebmgrdakhza-auth-token';

interface IdentityData {
  avatar_url?: string;
  email: string;
  email_verified: boolean;
  full_name?: string;
  iss?: string;
  name?: string;
  phone_verified: boolean;
  picture?: string;
  provider_id?: string;
  sub?: string;
}

interface Identity {
  identity_id: string;
  id: string;
  user_id: string;
  identity_data: IdentityData;
  provider: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  email: string;
}

interface UserMetadata {
  avatar_url?: string;
  email: string;
  email_verified: boolean;
  full_name?: string;
  iss?: string;
  name?: string;
  phone_verified: boolean;
  picture?: string;
  provider_id?: string;
  sub?: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
}

interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata: AppMetadata;
  user_metadata: UserMetadata;
  identities: Identity[];
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
}

interface TokenDTO {
  provider_token: string;
  access_token: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  token_type: string;
  user: User;
}

export function useManagerTokens() {
  const getToken = () => {
    const key: localStorageKey = 'sb-admyhroxjebmgrdakhza-auth-token';
    return localStorage.getItem(key) !== null
      ? localStorage.getItem(key)
      : null;
  };

  const convertTokenToJson = (token: string) => {
    return JSON.parse(token);
  };

  const getUserToken = (token: string) => {
    const _token: TokenDTO = convertTokenToJson(token);
    return _token.user;
  };

  const getDadosBasicos = (token: string) => {
    const _token: TokenDTO = convertTokenToJson(token);
    return {
      id: _token.user.id,
      email: _token.user.email,
      full_name: _token.user.user_metadata.full_name,
      avatar_url: _token.user.user_metadata.avatar_url,
    };
  };

  const isTokenAuthenticaded = () => {
    const token = getToken();

    if (token !== null) {
      {
        const _token: TokenDTO = convertTokenToJson(token);
        if (_token.user.aud === 'authenticated') {
          return true;
        }
      }

      return false;
    }
  };

  const getTokenDecoded = (token: string) => {
    return jwtDecode(token);
  };

  return {
    getToken,
    getUserToken,
    getDadosBasicos,
    isTokenAuthenticaded,
    getTokenDecoded,
  };
}
