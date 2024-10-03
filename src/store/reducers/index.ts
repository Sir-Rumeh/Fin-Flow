import { combineReducers } from '@reduxjs/toolkit';
import LoadingSlice from './LoadingSlice';

export const rootReducer = combineReducers({
  loading: LoadingSlice,
});
