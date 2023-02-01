import { createSlice } from '@reduxjs/toolkit';
import { LoadInformation } from '../shared/FormHandler/LoadInfo';
import { userLoads } from '../shared/urls';
import { userExpenses } from '../shared/urls';
import axios from 'axios';

const initialState = {
  loadDetail: LoadInformation,
};

const formSlice = createSlice({
  name: 'loadDetails',
  initialState,
  reducers: {
    submitLoad: (state, values) => {
      const newLoadInfo = values.payload;
      const token = newLoadInfo.token;

      delete newLoadInfo.token;
      const loadState = { ...newLoadInfo.formData };
      try {
        axios({
          method: 'POST',
          url: userLoads,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          data: {
            ...loadState,
          },
        }).catch((error) => {
          console.log(error);
        });
      } catch (err) {
        console.log(err);
      }
    },
    submitExpense: (state, values) => {
      const newExpenseInfo = values.payload;
      const token = newExpenseInfo.token;
      delete newExpenseInfo.token;
      const expenseInfo = { ...newExpenseInfo.formData };
      try {
        axios({
          method: 'POST',
          url: userExpenses,
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          data: {
            ...expenseInfo,
          },
        }).catch((error) => {
          console.log(error);
        });
      } catch (err) {
        console.log(err);
      }
    },
    removeAllLoads: (state, value) => {
      const id = value.payload.id;
      const key = value.payload.key;
      try {
        axios({
          method: 'DELETE',
          url: `https://razordispatchback.herokuapp.com/api/loads/user/${id}`,
          headers: {
            Authorization: 'Bearer ' + key,
            'Content-Type': 'application/json',
          },
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        throw err;
      }
    },
    removeAllExpenses: (state, value) => {
      const id = value.payload.id;
      const key = value.payload.key;
      try {
        axios({
          method: 'DELETE',
          url: `https://razordispatchback.herokuapp.com/api/expenses/user/${id}`,
          headers: {
            Authorization: 'Bearer ' + key,
            'Content-Type': 'application/json',
          },
        }).catch((err) => {
          console.log(err);
        });
      } catch (err) {
        throw err;
      }
    },
    removeSingleLoad: (state, value) => {
      const key = value.payload.key;
      const lid = value.payload.lid;
      try {
        axios({
          method: 'DELETE',
          url: `https://razordispatchback.herokuapp.com/api/loads/${lid}`,
          headers: {
            Authorization: 'Bearer ' + key,
            'Content-Type': 'application/json',
          },
        }).catch((err) => {
          console.warn(err);
        });
      } catch (err) {
        throw err;
      }
    },
    removeSingleExpense: (state, value) => {
      const key = value.payload.key;
      const eid = value.payload.eid;
      try {
        axios({
          method: 'DELETE',
          url: `https://razordispatchback.herokuapp.com/api/expenses/${eid}`,
          headers: {
            Authorization: 'Bearer ' + key,
            'Content-Type': 'application/json',
          },
        }).catch((err) => {
          console.warn(err);
        });
      } catch (err) {
        throw err;
      }
    },
  },
});

export const {
  submitLoad,
  submitExpense,
  removeAllLoads,
  removeAllExpenses,
  removeSingleLoad,
  removeSingleExpense,
} = formSlice.actions;

export default formSlice.reducer;
