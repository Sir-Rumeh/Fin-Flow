import { combineReducers } from '@reduxjs/toolkit';
import LoadingSlice from './LoadingSlice';
import AxiosSlice from './AxiosSlice';

export const rootReducer = combineReducers({
  loading: LoadingSlice,
  axios: AxiosSlice,
});
