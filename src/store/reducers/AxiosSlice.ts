import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  isRequestRetried: boolean;
}

const initialState: InitialState = {
  isRequestRetried: false,
};

const axiosSlice = createSlice({
  name: 'axios',
  initialState,
  reducers: {
    enableIsRetried: function (state) {
      state.isRequestRetried = true;
    },
    disableIsRetried: function (state) {
      state.isRequestRetried = false;
    },
  },
});

export const { enableIsRetried, disableIsRetried } = axiosSlice.actions;

export default axiosSlice.reducer;
