import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { ProfileRequest, QueryParams } from 'utils/interfaces';

/* PROFILE MANAGEMENT ACTIONS */
export const getProfiles = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profiles`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/profiles/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfilesByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profiles/merchant/${merchantId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getProfilesByAccountId = async (
  accountId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profiles/account/${accountId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableProfile = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/profiles/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableProfile = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/profiles/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProfile = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/profiles/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (
  requestId: string | undefined,
  payload: ProfileRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/profiles/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* PROFILE REQUEST ACTIONS */
export const getProfileRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profilerequests`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/profilerequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveProfileRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/profilerequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectProfileRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/profilerequests/decline/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addProfileRequest = async (payload: ProfileRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/profilerequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* PROFILE REQUEST STATISTICS */
export const getProfileStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/profilerequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
