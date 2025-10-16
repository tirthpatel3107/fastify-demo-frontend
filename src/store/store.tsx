import { configureStore } from '@reduxjs/toolkit';

import { customRootReducer } from './rootReducer';

export const store = configureStore({
  reducer: customRootReducer,
  // You can still include middleware if needed
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
