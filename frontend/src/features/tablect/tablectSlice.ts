import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ITableCtState, ITableData } from '../../types/tablect';

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
  },
});

export const { setCreateRowData, setActiveColId, setUpdateValueRow } =
  tablectSlice.actions;

export default tablectSlice.reducer;
