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

const AxiosClient = axios.create({
  baseURL: AppConfig.MERCHANT_URL,
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
      return Promise.reject(response);
    }
    dispatch(uiStopLoading());
    return response;
  },
  async (error) => {
    dispatch(uiStopLoading());
    const originalRequest = error.config;
    if (error?.response?.status === 401) {
      const user = getUserFromLocalStorage();
      const logoutUser = async () => {
        if (user) {
          try {
            const isAdmin = isAdminAuthData(user);
            const isMerchant = isMerchantAuthData(user);
            isAdmin
              ? await logoutStaff({
                  email: user.userData.email,
                  refreshToken: user.refreshToken,
                })
              : isMerchant
                ? await logoutMerchant({
                    email: user.profileData.email,
                    refreshToken: user.refreshToken,
                  })
                : null;
            dispatch(uiStopLoading());
            notifyError('Session expired. Please log in again.');
            localStorage.clear();
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
          } catch (error) {
            console.error(error);
            dispatch(uiStopLoading());
            notifyError('Session expired. Please log in again.');
            localStorage.clear();
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
          }
        } else {
          dispatch(uiStopLoading());
          notifyError('Session expired. Please log in again.');
          localStorage.clear();
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      };
      console.log('error', error);
      if (isRequestRetried) {
        logoutUser();
        return Promise.reject(error);
        // return Promise.reject(new Error('Token refresh failed. User logged out.'));
      } else {
        isRequestRetried = true;
        if (user) {
          try {
            let newToken;
            const res = isAdminAuthData(user)
              ? await refreshStaffToken({
                  email: user.userData.email,
                  refreshToken: user.refreshToken,
                })
              : await refreshMerchantToken({
                  email: user.profileData.email,
                  refreshToken: user.refreshToken,
                });
            if (res.responseCode === 200 && res.responseData) {
              dispatch(uiStopLoading());
              newToken = res?.responseData?.token;
              if (newToken) {
                localStorage.setItem('user', JSON.stringify({ ...user, token: newToken }));
                AxiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                return AxiosClient(originalRequest);
              }
            } else {
              dispatch(uiStopLoading());
              logoutUser();
              return Promise.reject(new Error('Token refresh failed. User logged out.'));
            }
          } catch (err) {
            console.error('Token refresh error:', err);
            dispatch(uiStopLoading());
            notifyError('Session expired. Please log in again.');
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
            return Promise.reject(err);
          }
        } else {
          notifyError('User is not authenticated');
          dispatch(uiStopLoading());
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        }
      }
    } else if (error?.response?.status === 400 || 404) {
      notifyError(error?.response?.data?.responseMessage);
      return Promise.reject(error);
    } else if (error?.response?.status === 500) {
      notifyError('Something went wrong');
      return Promise.reject(error);
    } else if (error.message === networkErrorMessage) {
      notifyError(error.message);
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export default AxiosClient;
