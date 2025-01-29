import AxiosClient from 'config/MandateManagementAxios';
import { appendParams } from 'utils/helpers';
import { MandateRequest, QueryParams } from 'utils/interfaces';

/* MANDATE REQUEST ACTIONS */
export const addMandateRequest = async (payload: MandateRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/mandaterequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBulkMandateRequest = async (payload: MandateRequest[] | undefined) => {
  try {
    const response = await AxiosClient.post('/mandaterequests/add/bulk', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/mandaterequests`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandates = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/mandates`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/mandates/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandatesByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/mandates/merchant/${merchantId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequestsByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/mandaterequests/merchant/${merchantId}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandatesByAccountId = async (
  accountId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/mandates/account/${accountId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequestsStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/mandaterequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequestsStatisticsByMerchantId = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/Mandaterequests/merchant/statistics/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMandateRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/mandaterequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveMandateRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectMandateRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/reject/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMandateRequest = async (
  requestId: string | undefined,
  payload: MandateRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/mandates/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const disableMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandates/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandates/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMandate = async (
  requestId: string | undefined,
  payload: { amount: number | undefined },
) => {
  try {
    const response = await AxiosClient.put(`/mandates/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* TRANSACTION HISTORY */
export const getTransactions = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/transactions`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactionById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/transactions/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTransactionsByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/transactions/merchant/${merchantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
