import { createSlice } from '@reduxjs/toolkit/';

const initialState = {
  loads: [],
  totalLoads: 0,
  loadTotalPrice: 0,
  expenses: [],
  totalExpenses: 0,
  expenseTotalPrice: 0,
  profit: 0,
};

const getDetails = createSlice({
  name: 'details',
  initialState,
  reducers: {
    loads: (state, values) => {
      const currentLoads = state.loads;
      const newLoads = values.payload;

      const Prices = newLoads
        .map((load) => load.TotalPrice)
        .reduce((cv, pv) => cv + pv, 0);

      if (!currentLoads.includes(newLoads)) {
        state.loads.push(newLoads);
        state.totalLoads = newLoads.length;
        state.loadTotalPrice = parseFloat(Prices).toFixed(2);
      } else {
        return;
      }
    },
    deleteLoads: (state, values) => {
      const itemId = values.payload;
      const newLoads = state.loads[0].filter((item) => item._id !== itemId);
      console.log(newLoads);
      const Prices = newLoads
        .map((load) => load.TotalPrice)
        .reduce((cv, pv) => cv + pv, 0);
      if (newLoads) {
        state.loads = [];
        state.loads.push(newLoads);
        if (state.totalLoads > 1) {
          state.totalLoads = state.totalLoads - 1;
        } else {
          state.totalLoads = 0;
          state.loads = [];
        }
        state.loadTotalPrice = parseFloat(Prices).toFixed(2);
      } else {
        state.loads = [];
      }
    },
    deleteAllLoads: (state) => {
      state.loads = [];
      (state.totalLoads = 0), (state.loadTotalPrice = 0);
    },
    expenses: (state, values) => {
      state.expenses = [];
      const currentExpenses = state.expenses.map((expense) => expense._id);
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
        state.expenses.push(newExpenses);
        state.totalExpenses = newExpenses.length;
        state.expenseTotalPrice = parseFloat(Prices).toFixed(2);
      }
    },
    deleteExpenses: (state, values) => {
      const itemId = values.payload;
      const newExpenses = state.expenses[0].filter(
        (item) => item._id !== itemId
      );
      const Prices = newExpenses
        .map(
          (expense) =>
            expense.Misc +
            expense.Repairs +
            expense.RoomAndBoard +
            expense.fuelPrice
        )
        .reduce((cv, pv) => cv + pv, 0);
      if (newExpenses) {
        state.expenses = [];
        state.expenses.concat(newExpenses);
        if (state.totalExpenses > 1) {
          state.totalExpenses = state.totalExpenses - 1;
        } else {
          state.totalExpenses = 0;
          state.expenses = [];
        }
        state.expenseTotalPrice = parseFloat(Prices).toFixed(2);
      } else {
        state.expenses = [];
      }
    },
    deleteAllExpenses: (state) => {
      state.expenses = [];
      (state.totalExpenses = 0), (state.expenseTotalPrice = 0);
    },
  },
});

export const {
  loads,
  expenses,
  deleteLoads,
  deleteExpenses,
  deleteAllLoads,
  deleteAllExpenses,
} = getDetails.actions;
export default getDetails.reducer;
