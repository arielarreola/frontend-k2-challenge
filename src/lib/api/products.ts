import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "../models/product.model";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => "/products",
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: "/products",
        method: "POST",
        body: product,
      }),
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
    }),

    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
    getCategories: builder.query<{ id: number; name: string }[], void>({
      query: () => "/categories",
      transformResponse: (response: any) => {
        if (response && typeof response === "object" && "data" in response) {
          return response.data;
        }
        return response;
      },
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productsApi;
