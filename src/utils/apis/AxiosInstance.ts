import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

// Utils
import { LOCAL_STORAGE } from 'src/utils/constants/auth';
import { getLocalStorage } from 'src/utils/storage';
import { AUTH_ROUTE } from './routes/clientApiRoutes';

interface Error {
  message: string[];
  statusCode: number;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_URI,
});

axiosInstance.interceptors.request.use(
  function (requestConfig: InternalAxiosRequestConfig) {
    if (getLocalStorage(LOCAL_STORAGE.TOKEN) !== null) {
      requestConfig.headers.set(
        'Authorization',
        `${getLocalStorage(LOCAL_STORAGE.TOKEN)}`
      );
    }
    return requestConfig;
  },
  function (error: AxiosError<Error>) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (responseConfig: AxiosResponse) {
    return responseConfig;
  },
  function (error: AxiosError<Error>) {
    if (error.response?.status === 401) {
      window.location.href = `${AUTH_ROUTE.LOGIN}`;
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
