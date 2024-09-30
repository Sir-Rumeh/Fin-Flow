import AxiosClient from 'config/Axios';
import { QueryParams } from 'utils/interfaces';

export const getStaffUsers = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    const { status, pageNo, pageSize, sortBy, sortOrder, searchFilter, startDate, endDate } =
      queryParams;

    if (status) params.append('Status', status);
    if (pageNo !== undefined) params.append('PageNo', pageNo.toString());
    if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
    if (sortBy) params.append('SortBy', sortBy);
    if (sortOrder) params.append('SortOrder', sortOrder);
    if (searchFilter) params.append('searchFilter', searchFilter);
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
  }

  try {
    const response = await AxiosClient.get(`/users?${params.toString()}`);
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
