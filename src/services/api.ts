import axios, { AxiosInstance } from 'axios';

import { AppError } from '@utils/APPERROR';
import { storageAuthTokeGet } from '@storage/storageAuthToken';

type SignOut = () => void;

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: SignOut) => () => void;
};

const api = axios.create({
  baseURL: 'http://127.0.0.1:3333'
}) as APIInstanceProps;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    if(requestError?.response?.status === 401) {
      if(requestError.response.data?.message === 'token.expired'
        || requestError.response.data?.message === 'token.invalid') {
          const { refresh_token } = await storageAuthTokeGet();

          if(!refresh_token) {
            signOut();
            return Promise.reject(requestError);
          }
        }

        signOut();
    }

    if(requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  });

  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  };
};

export { api };
