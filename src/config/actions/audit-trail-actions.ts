import AxiosClient from 'config/UserManagementAxios';
import { appendParams } from 'utils/helpers';
import { QueryParams } from 'utils/interfaces';

export const getAuditTrails = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/audits`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAuditTrailByMerchantId = async (
  merchantId: string | undefined,
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();
  appendParams(params, queryParams);
  try {
    const response = await AxiosClient.get(`/audits/merchant/${merchantId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
