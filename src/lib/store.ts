import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/productSlice";
import { productsApi } from "./api/products";

export const store = configureStore({
  reducer: {
    productReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
