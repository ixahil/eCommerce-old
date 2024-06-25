import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorHandler, transformResponse } from "../utils";

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API + "products/",
    credentials: "include",
  }),
  tagTypes: ["products"],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "",
      providesTags: ["products"],
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
    }),
    createProduct: builder.mutation({
      query: ({ data }) => ({
        url: "create-new",
        method: "POST",
        body: data,
      }),
      providesTags: ["products"],
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     queryFulfilled.then(({}) => {
      //       toast.success("Product created successfully");
      //       window.location.replace("./");
      //     });
      //   } catch (error) {
      //     toast.error("something went wrong");
      //   }
      // },
    }),
    // check collections api
    getCollections: builder.query({
      query: () => "collections",
      providesTags: ["collections"],
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
    }),
    updateProductStatus: builder.mutation({
      query: ({ data, endpoint }) => ({
        url: "product/update-status/" + endpoint,
        method: "PATCH",
        body: data,
      }),
      providesTags: ["products"],
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
      // onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
      //   try {
      //     queryFulfilled.then(({}) => {
      //       toast.success("Updated successfully");
      //     });
      //   } catch (error) {
      //     toast.error("something went wrong");
      //   }
      // },
    }),
    deleteProduct: builder.mutation({
      query: ({ endpoint }) => ({
        url: `product/${endpoint}`,
        method: "DELETE",
      }),
      transformErrorResponse: errorHandler,
    }),
    updateProduct: builder.mutation({
      query: ({ data, endpoint }) => ({
        url: `product/${endpoint}`,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useGetCollectionsQuery,
  useUpdateProductStatusMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApiSlice;

export default productApiSlice;
