import axios from 'axios';
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
    if (!navigator.onLine) {
      throw new Error('Please check your Internet Connection');
    }
    const headers = generateHeader();
    axiosConfig.headers.UTCTimestamp = headers.UTCTimestamp;
    axiosConfig.headers.Client_ID = headers.Client_ID;
    axiosConfig.headers['x-token'] = headers['x-token'];
    axiosConfig.headers['Ocp-Apim-Subscription-Key'] = headers['Ocp-Apim-Subscription-Key'];
    axiosConfig.headers['Ocp-Apim-Trace'] = true;
    dispatch(uiStartLoading());
    return axiosConfig;
  },
  (error) => {
    dispatch(uiStopLoading());
    notifyError(error?.message);
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  (response) => {
    console.log(response);
    dispatch(uiStopLoading());

    if (response.status === 200) {
      // notifySuccess(response.data.responseMessage);
      return response;
    }
    dispatch(uiStopLoading());
    return response;
  },
  async (error) => {
    console.log(error);

    if (error?.response?.status === 401) {
      // dispatch(logout());
      dispatch(uiStopLoading());
      notifyError('Your session timed out, sign in again to continue');
      window.location.href = '/login';
    } else if (error?.status === 500) {
      dispatch(uiStopLoading());
      notifyError(error?.message);
    }

    dispatch(uiStopLoading());
    // notifyError(
    //   error?.response?.data?.Message ? error?.response?.data?.Message : 'Something went wrong',
    // );
    return Promise.reject(error);
  },
);

export default AxiosClient;
