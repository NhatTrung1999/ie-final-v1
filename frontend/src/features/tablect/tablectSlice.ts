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
  },
});

export const { setCreateRowData, setActiveColId } = tablectSlice.actions;

export default tablectSlice.reducer;
