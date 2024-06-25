import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorHandler } from "../utils";

export const orderApiSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API + "orders/",
    credentials: "include",
  }),
  tagTypes: ["orders"],

  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation({
      query: ({ data, endpoint }) => ({
        url: "order/update-status/" + endpoint,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
    }),
  }),
});

export const { useUpdateOrderStatusMutation } = orderApiSlice;

export default orderApiSlice;
