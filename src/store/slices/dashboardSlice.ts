import { createSlice } from '@reduxjs/toolkit';
import { type RootState } from 'src/store/store';

const initialState = {
  dashboard: {},
};

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    getAllDashboardDataAction: (state, action) => {
      state.dashboard = action.payload;
    },
  },
});

export const { getAllDashboardDataAction } = DashboardSlice.actions;

export const getDashboardData = (state: RootState) => state.dashboard;

export default DashboardSlice.reducer;
