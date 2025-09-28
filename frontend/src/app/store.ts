import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import stagelistReducer from '../features/stagelist/stagelistSlice';
import tablectReducer from '../features/tablect/tablectSlice';
import controlpanelReducer from '../features/controlpanel/controlpanelSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stagelist: stagelistReducer,
    tablect: tablectReducer,
    controlpanel: controlpanelReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
