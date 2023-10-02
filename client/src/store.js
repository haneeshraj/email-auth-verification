import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlices';
import authSliceReducer from './slices/authSlices';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
