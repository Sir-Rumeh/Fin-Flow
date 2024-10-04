import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { QueryParams, StaffUserRequest } from 'utils/interfaces';

export const addStaffUserRequest = async (payload: StaffUserRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/users/add', payload);
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
    const response = await AxiosClient.get(`/users?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getStaffUserById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/users/user/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const enableStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/users/user/activate/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const disableStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.put(`/users/user/deactivate/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteStaffUser = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.delete(`/users/user/delete/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
