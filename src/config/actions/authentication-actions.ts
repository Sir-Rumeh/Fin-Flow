import AxiosClient from 'config/Axios';

/* AUTHENTICATION ACTIONS */
export const loginStaff = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/user', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginMerchant = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/profile', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
