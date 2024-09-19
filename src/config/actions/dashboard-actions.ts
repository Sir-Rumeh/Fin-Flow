import AxiosClient from 'config/Axios';
import { MandateRequest } from 'utils/interfaces';

/* MANDATE REQUEST ACTIONS */
export const addMandateRequest = async (payload: MandateRequest | undefined) => {
  return await AxiosClient.post(
    'https://apigateway.uat-fcmb.com/api/v1/mandaterequests/add',
    payload,
  )
    .then((response) => response)
    .catch((error) => error);
};
