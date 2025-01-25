import axios, { AxiosError, AxiosResponse } from 'axios';
import { useManagerTokens } from 'src/composables/managerTokens';

const backendUrl = `${process.env.BACKEND_URL}/sysaba`;

// Atualize o header globalmente
//axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const managerTokens = useManagerTokens();

export default function createHttp(base: string) {
  const http = axios.create({
    baseURL: `${backendUrl}${base}`,
    withCredentials: false,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      accept: 'application/json',
    },
    validateStatus: () => true,
  });

  const onRequestSuccess = <V>(value: V) => {
    return value;
  };
  const onRequestError = <V>(value: V) => {
    return value;
  };

  const onResponseSuccess = (res: AxiosResponse<any>) => {
    return handleResponse(res);
  };

  const onResponseError = (error: AxiosError<any>) => {
    if (error.response) {
      if (error.response.data?.data) {
        return handleResponse(error.response);
      } else {
        return { data: null, error: error.response.data };
      }
    } else {
      return { data: null, error: null };
    }
  };

  function handleResponse(res: AxiosResponse<any>) {
    const result = {
      data: null,
      status: res.status,
      error: '',
    };

    // Tratamento de status 401
    if (res.status === 401) {
      result.error = ''; // Pode ajustar conforme necessidade
      return result;
    }

    // Tratamento de status 400
    if (res.status === 400) {
      result.error = 'Bad request';
      return result;
    }

    // Tratamento de status >= 500
    if (res.status >= 500) {
      result.error = 'Erro interno do servidor';
      return result;
    }

    // Tratamento para sucesso (status 200)
    if (res.status === 200) {
      if (res.data.content) {
        result.data = res.data.content;
      } else if (res.data) {
        result.data = res.data;
      }
      result.error = ''; // Sucesso não deve ter erro
      return result;
    }

    // Se a resposta contém erro e é um objeto
    if (res.data && typeof res.data.error === 'object') {
      result.error = res.data.error; // Pode incluir uma lógica específica para erros personalizados
    } else if (res.data && res.data.error !== null) {
      result.error = res.data.error || 'Erro desconhecido'; // Mensagem para erros não padronizados
    }

    return result; // Retorna o resultado padronizado
  }

  http.interceptors.request.use(onRequestSuccess, onRequestError);
  http.interceptors.response.use(onResponseSuccess as any, onResponseError);

  http.interceptors.request.use(
    (config) => {
      const token = managerTokens.getToken(); // Obtenha o token atualizado
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return http;
}
