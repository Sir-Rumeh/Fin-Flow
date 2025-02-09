import AxiosClient from 'config/DoNameEnquiryAxios';
import { DoNameEnquiryRequest } from 'utils/interfaces';

export const doNameEnquiry = async (payload: DoNameEnquiryRequest | undefined) => {
  try {
    const response = await AxiosClient.post('/NameEnquiry/DoNameEnquiry', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
