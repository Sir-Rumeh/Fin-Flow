import AxiosClient from 'config/UserManagementAxios';
import { appendParams } from 'utils/helpers';
import { QueryParams, StaffUserRequest } from 'utils/interfaces';

export const addStaffUserRequest = async (payload: StaffUserRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/userrequests/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const addBulkStaffUserRequest = async (payload: StaffUserRequest[] | undefined) => {
  try {
    const response = await AxiosClient.post('/userrequests/add/bulk', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStaffUserRequest = async (
  requestId: string | undefined,
  payload: StaffUserRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/users/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUsers = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/users`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUserById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/users/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUsersRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/userrequests`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUserRequestById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/userrequests/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUsersRequestsStatistics = async () => {
  try {
    const response = await AxiosClient.get(`/userrequests/statistics`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/users/enable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const disableStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/users/disable/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/users/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const approveStaffUserRequest = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/userrequests/approve/${requestId}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectStaffUserRequest = async (
  requestId: string | undefined,
  payload: { remark: string },
) => {
  try {
    const response = await AxiosClient.put(`/userrequests/reject/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
