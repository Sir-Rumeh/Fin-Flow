import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { QueryParams } from 'utils/interfaces';

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
