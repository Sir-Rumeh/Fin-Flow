import AxiosClient from 'config/Axios';
import { appendParams } from 'utils/helpers';
import { QueryParams } from 'utils/interfaces';

export const getProfiles = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profiles?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileById = async (requestId: string | undefined) => {
  try {
    const response = await AxiosClient.get(`/profiles/${requestId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileRequests = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/profilerequests?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
