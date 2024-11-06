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

export const refreshStaffToken = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/user/refresh-token', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutStaff = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/user/logout', payload);
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

export const refreshMerchantToken = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/profile/refresh-token', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutMerchant = async (payload: any | undefined) => {
  try {
    const response = await AxiosClient.post('/authenticate/profile/logout', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
