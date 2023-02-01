import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpenLoad: false,
  isOpenExpense: false,
};

const removeLoadSlice = createSlice({
  name: 'removeModal',
  initialState,
  reducers: {
    removeLoadModal: (state) => {
      state.isOpenLoad = true;
    },
    removeCloseLoadModal: (state) => {
      state.isOpenLoad = false;
    },

    removeExpenseModal: (state) => {
      state.isOpenExpense = true;
    },
    removeCloseExpenseModal: (state) => {
      state.isOpenExpense = false;
    },
  },
});

export const {
  removeLoadModal,
  removeCloseLoadModal,
  removeExpenseModal,
  removeCloseExpenseModal,
} = removeLoadSlice.actions;
export default removeLoadSlice.reducer;
