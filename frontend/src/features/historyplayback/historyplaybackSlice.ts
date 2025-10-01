import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import historyplaybackApi from '../../api/historyplaybackApi';
import type { IHistoryplaybackPayload } from '../../types/historyplayback';

export const historyplaybackList = createAsyncThunk(
  'historyplayback/historyplayback-list',
  async () => {
    const res = await historyplaybackApi.historyplaybackList();
    return res;
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

const historyplaybackSlice = createSlice({
  name: 'historyplayback',
  initialState: {},
  reducers: {},
});

export default historyplaybackSlice.reducer;
