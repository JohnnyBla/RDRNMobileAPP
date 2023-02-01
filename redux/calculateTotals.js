import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loads: [],
  expense: [],
  loadTotal: 0,
  expenseTotal: 0,
  loadTotalPrice: 0,
  expenseTotalPrice: 0,
  profit: 0,
};

const calculateSlice = createSlice({
  name: 'totals',
  initialState,
  reducers: {
    loadTotal: (state, [values]) => {
      console.log(values.payload);
      const currentLoads = state.loads.map((load) => load._id);
      const newLoads = values.payload.map((load) => load);
      const Prices = newLoads
        .map((load) => load.TotalPrice)
        .reduce((cv, pv) => cv + pv, 0);

      if (!currentLoads.includes(newLoads._id)) {
        state.loads.push(newLoads);
        state.loadTotal = newLoads.length;
        state.loadTotalPrice = parseFloat(Prices).toFixed(2);
      } else {
        return;
      }
    },
    expenseTotal: (state, values) => {
      const currentExpenses = state.expense.map((expense) => expense._id);
      const newExpenses = values.payload.map((expense) => expense);

      const Prices = newExpenses
        .map(
          (expense) =>
            expense.Misc +
            expense.Repairs +
            expense.RoomAndBoard +
            expense.fuelPrice
        )
        .reduce((cv, pv) => cv + pv, 0);
      if (!currentExpenses.includes(newExpenses._id)) {
        state.expense.push(newExpenses);
        state.expenseTotal = newExpenses.length;
        state.expenseTotalPrice = parseFloat(Prices).toFixed(2);
      }
    },
    calculateProfit: (state) => {
      const profit = parseFloat(
        state.loadTotalPrice - state.expenseTotalPrice
      ).toFixed(2);
      state.profit = profit;
    },
  },
});

export const { loadTotal, expenseTotal, calculateProfit } =
  calculateSlice.actions;
export default calculateSlice.reducer;
