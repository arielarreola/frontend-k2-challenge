import { createSlice } from "@reduxjs/toolkit";
import { productsApi } from "../api/products";
import type { Product } from "../models/product.model";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        state.products = action.payload;
      },
    );
    builder.addMatcher(
      productsApi.endpoints.createProduct.matchFulfilled,
      (state, action) => {
        state.products.push(action.payload);
      },
    );
    builder.addMatcher(
      productsApi.endpoints.deleteProduct.matchFulfilled,
      (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.meta.arg.originalArgs,
        );
      },
    );
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchPending,
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      productsApi.endpoints.getProducts.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al buscar productos";
      },
    );
    builder.addMatcher(
      productsApi.endpoints.createProduct.matchPending,
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      productsApi.endpoints.createProduct.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al crear producto nuevo";
      },
    );
    builder.addMatcher(
      productsApi.endpoints.deleteProduct.matchPending,
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      productsApi.endpoints.deleteProduct.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error al eliminar producto";
      },
    );
  },
});

export const { setProducts, setLoading, setError } = productSlice.actions;
export default productSlice.reducer;
