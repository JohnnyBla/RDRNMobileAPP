import { configureStore } from '@reduxjs/toolkit';

import calculateTotals from './calculateTotals';
import loadInfoReducer from './loadInfoReducer';
import getDetails from './getDetails';
import passLoad from './passLoad';
import resetPass from './resetPass';
import removeLoads from './removeLoads';

export const store = configureStore({
  reducer: {
    modal: removeLoads,
    details: getDetails,
    passLoad: passLoad,
    reset: resetPass,
    loadDetail: loadInfoReducer,
    totals: calculateTotals,
  },
});
