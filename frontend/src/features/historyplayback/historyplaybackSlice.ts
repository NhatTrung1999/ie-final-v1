import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import historyplaybackApi from '../../api/historyplaybackApi';
import type {
  IHistoryplaybackData,
  IHistoryplaybackPayload,
  IHistoryplaybackState,
} from '../../types/historyplayback';

export const historyplaybackList = createAsyncThunk(
  'historyplayback/historyplayback-list',
  async () => {
    const res = await historyplaybackApi.historyplaybackList();
    return res as IHistoryplaybackData[];
  }
);

export const historyplaybackCreate = createAsyncThunk(
  'historyplayback/historyplayback-create',
  async (payload: IHistoryplaybackPayload) => {
    const res = await historyplaybackApi.historyplaybackCreate(payload);
    return res;
  }
);

export const historyplaybackDelete = createAsyncThunk(
  'historyplayback/historyplayback-delete',
  async (payload: { Id: string; HistoryPlaybackId: string }) => {
    const res = await historyplaybackApi.historyplaybackDelete(payload);
    return res;
  }
);

const initialState: IHistoryplaybackState = {
  historyplayback: [],
  loading: false,
  error: null,
};

const historyplaybackSlice = createSlice({
  name: 'historyplayback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(historyplaybackList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        historyplaybackList.fulfilled,
        (state, action: PayloadAction<IHistoryplaybackData[]>) => {
          state.loading = false;
          state.historyplayback = action.payload;
        }
      )
      .addCase(historyplaybackList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default historyplaybackSlice.reducer;
