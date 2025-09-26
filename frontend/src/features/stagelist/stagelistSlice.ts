import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { IStageListState } from '../../types/stagelist';
import stagelistApi from '../../api/stagelistApi';
import type { IFormModal } from '../../types/modal';

const initialState: IStageListState = {
  stagelist: [],
  loading: false,
  error: null,
};

export const stagelistUpload = createAsyncThunk(
  'stagelist/upload',
  async (payload: IFormModal) => {
    const { date, season, stage, area, article, files } = payload;
    const formData = new FormData();

    formData.append('date', date.trim());
    formData.append('season', season.toUpperCase().trim());
    formData.append('stage', stage.trim());
    formData.append('area', area.trim());
    formData.append('article', article.toUpperCase().trim());
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    await stagelistApi.stagelistUpload(formData);
  }
);

const stagelistSlice = createSlice({
  name: 'stagelist',
  initialState,
  reducers: {},
});

export default stagelistSlice.reducer;
