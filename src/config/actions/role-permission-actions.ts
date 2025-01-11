import AxiosClient from 'config/UserManagementAxios';
import { appendParams } from 'utils/helpers';
import {
  AssignRoleRequest,
  QueryParams,
  RolePermissionRequest,
  RoleRequest,
} from 'utils/interfaces';

export const getRoles = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/roles`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRoleById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/roles/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRolePermissions = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/rolepermissions`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRolePermissionByRoleId = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`rolepermissions/role/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addRoleRequest = async (payload: RoleRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/roles/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const assignRoleRequest = async (payload: AssignRoleRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/userroles/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRoleRequest = async (
  requestId: string | undefined,
  payload: RoleRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/roles/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addRolePermissionRequest = async (payload: RolePermissionRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/rolepermissions/add', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRolePermissionRequest = async (
  requestId: string | undefined,
  payload: RolePermissionRequest | undefined,
) => {
  try {
    const response = await AxiosClient.put(`/rolepermissions/update/${requestId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
