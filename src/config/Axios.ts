import axios, { AxiosResponse } from 'axios';
import store from 'store/index';
import { AppConfig } from './index';
import { generateHeader, notifySuccess, notifyError } from 'utils/helpers/index';
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

AxiosClient.interceptors.request.use(
  (axiosConfig) => {
    dispatch(uiStartLoading());
    if (!navigator.onLine) {
      throw new Error('Please check your Internet Connection');
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
    if (error?.response?.status === 401) {
      dispatch(uiStopLoading());
      // dispatch(logout());
      notifyError('Your session timed out, sign in again to continue');
      window.location.href = '/login';
    } else if (error?.response?.status === 500) {
      dispatch(uiStopLoading());
      notifyError('Something went wrong');
      return Promise.reject(error);
    }
    dispatch(uiStopLoading());
    notifyError(
      error?.response?.data?.responseMessage
        ? error?.response?.data?.responseMessage
        : 'Something went wrong',
    );
    return Promise.reject(error);
  },
);

export default AxiosClient;
