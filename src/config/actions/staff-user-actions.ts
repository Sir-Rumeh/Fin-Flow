import AxiosClient from 'config/Axios';
import { QueryParams } from 'utils/interfaces';

export const getStaffUsers = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    const { status, pageNo, pageSize, sortBy, sortOrder } = queryParams;

    if (status) params.append('Status', status);
    if (pageNo !== undefined) params.append('PageNo', pageNo.toString());
    if (pageSize !== undefined) params.append('PageSize', pageSize.toString());
    if (sortBy) params.append('SortBy', sortBy);
    if (sortOrder) params.append('SortOrder', sortOrder);
  }

  try {
    const response = await AxiosClient.get(`/users?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
