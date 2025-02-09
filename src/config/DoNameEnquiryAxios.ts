import axios, { AxiosResponse } from 'axios';
import store from 'store/index';
import { abortControllers, AppConfig } from './index';
import { generateHeader, getUserFromLocalStorage, notifyError } from 'utils/helpers/index';
import { uiStartLoading, uiStopLoading } from 'store/reducers/LoadingSlice';
import axiosRetry from 'axios-retry';

const AxiosClient = axios.create({
  baseURL: AppConfig.DO_NAME_ENQUIRY_URL,
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

const networkErrorMessage = 'Network error: Please check your internet connection.';

const cancelPendingRequests = () => {
  abortControllers.forEach((controller) => controller.abort());
  abortControllers.clear();
};

AxiosClient.interceptors.request.use(
  (axiosConfig) => {
    if (!navigator.onLine) {
      const networkError = new Error(networkErrorMessage);
      notifyError(networkError.message);
      throw networkError;
    }
    dispatch(uiStartLoading());
    // Attach a new AbortController for this request
    const controller = new AbortController();
    // const requestKey = `${axiosConfig.method?.toUpperCase()} ${axiosConfig.url}`;
    abortControllers.set(axiosConfig, controller);
    axiosConfig.signal = controller.signal;

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

AxiosClient.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (!(response.status === 200)) {
      dispatch(uiStopLoading());
      return Promise.reject(response);
    } else if (response.status === 200 && response.data.code !== '00') {
      dispatch(uiStopLoading());
      notifyError(response.data.description);
      return Promise.reject(response);
    }
    dispatch(uiStopLoading());
    abortControllers.delete(response.config);
    return response;
  },
  async (error) => {
    dispatch(uiStopLoading());
    const originalRequest = error.config;
    const controller = abortControllers.get(error.config);
    if (controller) {
      controller.abort();
      abortControllers.delete(error.config);
    }
    if (!error.response) {
      notifyError('Failed to receive response. Confirm the request and try again');
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
    } else if (error?.response?.status === 400 || error?.response?.status === 424) {
      error?.response?.data?.errors
        ? notifyError(`${error?.response?.data?.errors[0]}. ${error?.response?.data?.errors[1]}`)
        : notifyError(
            error?.response?.data?.description ||
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
    }
    return Promise.reject(error);
  },
);

axiosRetry(AxiosClient, { retries: 0 });

export default AxiosClient;
