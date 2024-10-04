import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { MerchantRequest, QueryParams } from 'utils/interfaces';

export const getMerchants = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/merchants?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantsRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/merchantrequests?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantsRequestsStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/merchantrequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/merchants/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMerchantRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/merchantrequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addMerchantRequest = async (payload: MerchantRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/merchantrequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMerchantRequest = async (
  requestId: string | undefined,
  payload: MerchantRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/merchantrequests/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableMerchant = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/merchants/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMerchant = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/merchants/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableMerchant = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/merchants/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveMerchantRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/merchantrequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectMerchantRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/merchantrequests/reject/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
