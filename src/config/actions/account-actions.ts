import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { AccountRequest, QueryParams } from 'utils/interfaces';

export const getAccounts = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/accounts`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountsRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/accountrequests`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountsRequestsStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/accountrequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/accounts/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountsByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/accounts/merchant/${merchantId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccountRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/accountrequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addAccountRequest = async (payload: AccountRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/accountrequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateAccountRequest = async (
  requestId: string | undefined,
  payload: AccountRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/accounts/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableAccount = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/accounts/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAccount = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/accounts/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableAccount = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/accounts/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveAccountRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/accountrequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectAccountRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/accountrequests/reject/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
