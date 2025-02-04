import axios, { AxiosResponse } from 'axios';
import store from 'store/index';
import { AppConfig } from './index';
import {
  generateHeader,
  getUserFromLocalStorage,
  isAdminAuthData,
  isMerchantAuthData,
  notifyError,
} from 'utils/helpers/index';
import { uiStartLoading, uiStopLoading } from 'store/reducers/LoadingSlice';
import {
  logoutMerchant,
  logoutStaff,
  refreshMerchantToken,
  refreshStaffToken,
} from './actions/authentication-actions';
import axiosRetry from 'axios-retry';

const AxiosClient = axios.create({
  baseURL: AppConfig.AUTH_URL,
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

let isRequestRetried = false;

AxiosClient.interceptors.request.use(
  (axiosConfig) => {
    if (!navigator.onLine) {
      const networkError = new Error(networkErrorMessage);
      notifyError(networkError.message);
      throw networkError;
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
    return Promise.reject(error);
  },
);

let abortController = new AbortController();

AxiosClient.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (!(response.status === 200)) {
      dispatch(uiStopLoading());
      return Promise.reject(response);
    }
    dispatch(uiStopLoading());
    return response;
  },
  async (error) => {
    dispatch(uiStopLoading());
    if (!error.response) {
      notifyError('Network error. Failed to receive response');
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
      notifyError('Session expired. Please log in again.');
      dispatch(uiStopLoading());
      localStorage.clear();
    } else if (error?.response?.status === 400 || error?.response?.status === 424) {
      error?.response?.data?.errors
        ? notifyError(`${error?.response?.data?.errors[0]}. ${error?.response?.data?.errors[1]}`)
        : notifyError(
            error?.response?.data?.responseMessage ||
              error?.response?.data?.message ||
              'Invalid request',
          );
      return Promise.reject(error);
    } else if (error?.response?.status === 404) {
      notifyError(
        error?.response?.data?.responseMessage ||
          error?.response?.data?.message ||
          'Resource not found.',
      );
      return Promise.reject(error);
    } else if (error?.response?.status === 403) {
      notifyError('You do not have permission to perform this action. Please contact an admin');
      return Promise.reject(error);
    } else if (error?.response?.status === 500) {
      notifyError('Something went wrong');
      return Promise.reject(error);
    } else if (error?.response?.status === 504) {
      notifyError('Gateway connection timeout');
      return Promise.reject(error);
    } else if (error.message === networkErrorMessage) {
      notifyError(error.message);
      return Promise.reject(error);
    } else if (!error?.response?.status) {
      notifyError('Network error. Failed to receive response');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
axiosRetry(AxiosClient, { retries: 0 });

AxiosClient.interceptors.request.use((config) => {
  config.signal = abortController.signal;
  return config;
});

export default AxiosClient;
