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
import { disableIsRetried, enableIsRetried } from 'store/reducers/AxiosSlice';

const AxiosClient = axios.create({
  baseURL: AppConfig.USER_URL,
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

const abortControllers = new Map();

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
    abortControllers.set(axiosConfig, controller);
    axiosConfig.signal = controller.signal;

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

AxiosClient.interceptors.response.use(
  (response: AxiosResponse | any) => {
    if (!(response.status === 200)) {
      dispatch(uiStopLoading());
      return Promise.reject(response);
    }
    dispatch(uiStopLoading());
    abortControllers.delete(response.config);
    return response;
  },
  async (error) => {
    dispatch(uiStopLoading());
    const originalRequest = error.config;
    abortControllers.delete(originalRequest);
    if (error?.response?.status === 401) {
      cancelPendingRequests();
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
            localStorage.clear();
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          } catch (error) {
            console.error(error);
            dispatch(uiStopLoading());
            localStorage.clear();
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }
        } else {
          dispatch(uiStopLoading());
          localStorage.clear();
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        }
      };
      // if (originalRequest._isRetry) {
      const isRequestRetried = store.getState().axios.isRequestRetried;
      if (isRequestRetried) {
        const controller = abortControllers.get(originalRequest);
        if (controller) controller.abort();
        logoutUser();
        return;
        // return Promise.reject(new Error('Token refresh failed. User logged out.'));
      } else {
        // originalRequest._isRetry = true;
        dispatch(enableIsRetried());
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
              return Promise.reject(new Error('Token refresh failed. User logged out.'));
            }
            dispatch(disableIsRetried());
          } catch (err) {
            // notifyError('Session expired. Please log in again.');
            dispatch(disableIsRetried());
            dispatch(uiStopLoading());
            logoutUser();
            setTimeout(() => {
              window.location.href = '/';
            }, 500);
          }
        } else {
          notifyError('User is not authenticated');
          dispatch(disableIsRetried());
          dispatch(uiStopLoading());
          localStorage.clear();
          setTimeout(() => {
            window.location.href = '/';
          }, 500);
        }
      }
    } else if (error?.response?.status === 400 || 404) {
      notifyError(error?.response?.data?.responseMessage);
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
