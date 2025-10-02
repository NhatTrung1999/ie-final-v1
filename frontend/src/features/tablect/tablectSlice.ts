import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type {
  ITableCtPayload,
  ITableCtState,
  ITableData,
} from '../../types/tablect';
import tablectApi from '../../api/tablectApi';

export const saveData = createAsyncThunk(
  'tablect/save-data',
  async (payload: ITableCtPayload) => {
    try {
      const res = await tablectApi.saveData(payload);
      const convertNva = JSON.parse(res.Nva);
      const convertVa = JSON.parse(res.Va);
      return { ...res, Nva: convertNva, Va: convertVa } as ITableData;
    } catch (error: any) {
      console.log(error);
    }
  }
);

const initialState: ITableCtState = {
  tablect: [],
  activeColId: null,
  loading: false,
  error: null,
};

const tablectSlice = createSlice({
  name: 'tablect',
  initialState,
  reducers: {
    setCreateRowData: (state, action: PayloadAction<ITableData>) => {
      state.tablect.push(action.payload);
    },
    setActiveColId: (state, action: PayloadAction<string | null>) => {
      if (state.activeColId === action.payload) {
        state.activeColId = null;
      } else {
        state.activeColId = action.payload;
      }
    },
    setUpdateValueRow: (
      state,
      action: PayloadAction<{
        id: string;
        colId: number;
        nvaTime: number;
        vaTime: number;
      }>
    ) => {
      const { id, colId, nvaTime, vaTime } = action.payload;
      state.tablect.map((item) => {
        if (item.Id === id) {
          item.Nva.Cts[colId] += Number(nvaTime.toFixed(2));
          item.Va.Cts[colId] += Number(vaTime.toFixed(2));
        }
      });
    },
    setUpdateAverage: (
      state,
      action: PayloadAction<{ id: string; avgNva: number; avgVa: number }>
    ) => {
      const { id, avgNva, avgVa } = action.payload;
      state.tablect.map((item) => {
        if (item.Id === id) {
          item.Nva.Average = avgNva;
          item.Va.Average = avgVa;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        // state.tablect.push(action.payload);
      })
      .addCase(saveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCreateRowData,
  setActiveColId,
  setUpdateValueRow,
  setUpdateAverage,
} = tablectSlice.actions;

export default tablectSlice.reducer;
