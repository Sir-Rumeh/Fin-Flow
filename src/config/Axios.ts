import axios, { AxiosResponse } from 'axios';
import store from 'store/index';
import { AppConfig } from './index';
import { generateHeader, getUserFromLocalStorage, notifyError } from 'utils/helpers/index';
import { uiStartLoading, uiStopLoading } from 'store/reducers/LoadingSlice';

const AxiosClient = axios.create({
  baseURL: AppConfig.SERVER_URL,
  headers: {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Content-Security-Policy': "frame-ancestors 'self' X-Frame-Options: DENY",
    'x-encrypted': true,
    channel: 'WEB',
  },
});

const { dispatch } = store;

const networkErrorMessage = 'Please check your Internet Connection';

AxiosClient.interceptors.request.use(
  (axiosConfig) => {
    if (!navigator.onLine) {
      throw new Error(networkErrorMessage);
    }
    dispatch(uiStartLoading());

    const user = getUserFromLocalStorage();

    if (user) {
      const { token } = user;
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    } else {
      delete axiosConfig.headers.Authorization;
    }

    const headers = generateHeader();
    axiosConfig.headers.UTCTimestamp = headers.UTCTimestamp;
    axiosConfig.headers.Client_ID = headers.Client_ID;
    axiosConfig.headers['x-token'] = headers['x-token'];
    axiosConfig.headers['Ocp-Apim-Subscription-Key'] = headers['Ocp-Apim-Subscription-Key'];
    axiosConfig.headers['Ocp-Apim-Trace'] = true;
    return axiosConfig;
  },
  (error) => {
    dispatch(uiStopLoading());
    notifyError(error?.message);
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (!(response.status === 200)) {
      dispatch(uiStopLoading());
      return;
    }
    dispatch(uiStopLoading());
    return response;
  },
  async (error) => {
    if (error?.response?.status === 400) {
      dispatch(uiStopLoading());
      notifyError(error?.response?.data?.responseMessage);
      return Promise.reject(error?.response?.data?.responseMessage);
    } else if (error?.response?.status === 401) {
      dispatch(uiStopLoading());
      // dispatch(logout());
      notifyError('Your session timed out, sign in again to continue');
      window.location.href = '/';
    } else if (error?.response?.status === 404) {
      const url = window.location.href.split('/').slice(0, 5).join('/');
      dispatch(uiStopLoading());
      notifyError('Resource not found');
      setTimeout(() => {
        window.location.href = url;
      }, 1500);
      return Promise.reject(error);
    } else if (error?.response?.status === 500) {
      dispatch(uiStopLoading());
      notifyError('Something went wrong');
      return Promise.reject(error);
    } else if (error.message === networkErrorMessage) {
      dispatch(uiStopLoading());
      notifyError(error.message);
      return Promise.reject(error);
    }
    dispatch(uiStopLoading());
    return Promise.reject(error);
  },
);

export default AxiosClient;
