import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'src/store/store';

const initialState = {
  isSidebarOpen: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    setSidebarAction: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setSidebarAction } = commonSlice.actions;

export const commonActionData = (state: RootState) => state.common;

export default commonSlice.reducer;
