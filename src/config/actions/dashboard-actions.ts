import AxiosClient from 'config/Axios';
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

export const getMandateRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    const { mandateCode, status, pageNo, pageSize, sortBy, sortOrder } = queryParams;

    if (mandateCode) params.append('MandateCode', mandateCode);
    if (status) params.append('Status', status);
    if (pageNo !== undefined) params.append('PageNo', pageNo.toString());
    if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
    if (sortBy) params.append('SortBy', sortBy);
    if (sortOrder) params.append('SortOrder', sortOrder);
  }

  try {
    const response = await AxiosClient.get(`/mandaterequests?${params.toString()}`);
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

export const rejectMandateRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandaterequests/decline/${requestId}`, {});
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

/* MANDATE MANAGEMENT ACTIONS */
export const getMandates = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    const { mandateCode, status, pageNo, pageSize, sortBy, sortOrder } = queryParams;

    if (mandateCode) params.append('MandateCode', mandateCode);
    if (status) params.append('Status', status);
    if (pageNo !== undefined) params.append('PageNo', pageNo.toString());
    if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
    if (sortBy) params.append('SortBy', sortBy);
    if (sortOrder) params.append('SortOrder', sortOrder);
  }

  try {
    const response = await AxiosClient.get(`/mandates?${params.toString()}`);
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

export const updateMandate = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/mandates/update/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};
