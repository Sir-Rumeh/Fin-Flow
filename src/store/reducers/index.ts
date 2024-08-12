import { combineReducers } from '@reduxjs/toolkit';
import uiReducer from './LoadingSlice';

export const rootReducer = combineReducers({
  loading: uiReducer,
});
