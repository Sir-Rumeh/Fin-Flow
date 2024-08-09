import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
	isLoading: boolean;
}

const initialState: InitialState = {
	isLoading: false,
};

const loadingSlice = createSlice({
	name: "loading",
	initialState,
	reducers: {
		uiStartLoading: function (state) {
			state.isLoading = true;
		},
		uiStopLoading: function (state) {
			state.isLoading = false;
		},
	},
});

export const { uiStartLoading, uiStopLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
