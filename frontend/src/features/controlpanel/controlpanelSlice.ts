import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IControlPanelState } from '../../types/controlpanel';

const initialState: IControlPanelState = {
  isPlaying: false,
  duration: 0,
  currentTime: 0,
};

const controlpanelSlice = createSlice({
  name: 'controlpanel',
  initialState,
  reducers: {
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { setIsPlaying, setDuration, setCurrentTime } =
  controlpanelSlice.actions;

export default controlpanelSlice.reducer;
