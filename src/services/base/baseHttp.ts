import axios, { AxiosError, AxiosResponse } from 'axios';
import { useManagerTokens } from 'src/composables/managerTokens';

//const token = useManagerTokens().getToken();

const backendUrl = 'http://localhost:8080/'; // Use variável de ambiente ou URL fixa

// Atualize o header globalmente
//axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const managerTokens = useManagerTokens();

export default function createHttp(base: string) {
  const http = axios.create({
    baseURL: `${backendUrl}sysaba${base}`,
    withCredentials: false,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Access-Control-Allow-Origin': '*',
      'content-type': 'application/json',
      accept: 'application/json',
      //Authorization: `Bearer ${token}`,
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
    if (res.status === 401) {
      return {
        data: res.data,
        error: null,
      };
    } else if (res.status === 400) {
      return {
        data: null,
        error: 'Bad request',
      };
    } else if (res.status >= 500) {
      return {
        data: null,
        error: 'Erro interno do servidor',
      };
    }
    try {
      // Response sem erro
      if (res.data.content) {
        return {
          data: res.data.content,
          error: null,
        };
      } else if (res.data) {
        return {
          data: res.data,
          error: null,
        };
      } else if (res.status == 200) {
        return {
          status: res.status,
          error: null,
        };
      } else {
        // Tem error e é um objeto
        if (res.data.error instanceof Object) {
          throw res.data.error;
        } else if (res.data.error === null) {
          return { data: null, error: null };
        }
        // Tem erro mas n é o padrão que tá definido por APIError
        else {
          throw res.data;
        }
      }
    } catch (error) {
      return { data: null, error: error as any };
    }
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
