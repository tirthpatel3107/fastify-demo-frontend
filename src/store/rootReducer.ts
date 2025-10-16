import { type UnknownAction, combineReducers } from '@reduxjs/toolkit';
import { REDUX } from 'src/utils/constants/auth';

// Slices
import commonSlice from './slices/commonSlice';
import dashboardSlice from './slices/dashboardSlice';

export const rootReducer = combineReducers({
  common: commonSlice,
  dashboard: dashboardSlice,
});

export const customRootReducer = (state: any, action: UnknownAction) => {
  if (action.type === REDUX.RESET_STORE) {
    return rootReducer(undefined, action);
  }
  return rootReducer(state, action);
};
