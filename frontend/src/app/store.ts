import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import stagelistReducer from '../features/stagelist/stagelistSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stagelist: stagelistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
