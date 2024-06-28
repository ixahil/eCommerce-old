import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { errorHandler, transformResponse } from "../utils";
import { logoutUser, setUser } from "../slice/user-slice";
import { removeUserProfile, setUserProfile } from "../slice/profile-slice";
import toast from "react-hot-toast";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API + "users/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => "me",
      transformResponse: transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setUserProfile(data.profile));
        } catch (error) {}
      },
    }),
    signupUser: builder.mutation({
      query: (data) => ({
        url: "signup",
        method: "POST",
        body: data,
      }),
      transformResponse: transformResponse,
      transformErrorResponse: errorHandler,
    }),
    loginUser: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "POST",
        body: data,
      }),
      transformResponse: transformResponse,
      transformErrorResponse: errorHandler,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user));
          dispatch(setUserProfile(data.profile));
        } catch (error) {}
      },
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
          dispatch(removeUserProfile());
        } catch (error) {}
      },
    }),
    resendEmailVerification: builder.mutation({
      query: () => ({
        url: "resend-email-verification",
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        toast.loading("sending email verification", { id: "loading" });
        try {
          await queryFulfilled;
          toast.dismiss("loading");
          toast.success("Verification Link Sent, Please check your inbox");
        } catch (error) {}
      },
    }),
    updateAccount: builder.mutation({
      query: (data) => ({
        url: "update-account",
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data.user));
        } catch (error) {}
      },
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "update-password",
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
    }),
    deleteAccount: builder.mutation({
      query: (data) => ({
        url: "delete-account",
        method: "DELETE",
        body: data,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(logoutUser());
          dispatch(removeUserProfile());
        } catch (error) {}
      },
    }),

    // ADMIN

    updateUserStatus: builder.mutation({
      query: ({ data, endpoint }) => ({
        url: "user/update-status/" + endpoint,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLoginUserMutation,
  useLogoutUserMutation,
  useResendEmailVerificationMutation,
  useUpdateAccountMutation,
  useUpdatePasswordMutation,
  useDeleteAccountMutation,
  useUpdateUserStatusMutation,
  useSignupUserMutation,
} = userApi;

export default userApi;
