import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loads: [],
  expenses: [],
};

const passLoad = createSlice({
  name: 'loadInfo',
  initialState,
  reducers: {
    passLoadData: (state, values) => {
      state.loads = values.payload;
    },
    passExpenseData: (state, values) => {
      state.expenses = values.payload;
    },
  },
});

export const { passLoadData, passExpenseData } = passLoad.actions;

export default passLoad.reducer;
