import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUserProfile } from "../slice/profile-slice";
import { errorHandler, transformResponse } from "../utils";

export const profileApiSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API + "profiles/",
    credentials: "include",
  }),
  tagTypes: ["profile"],

  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "me",
      providesTags: ["profile"],
      // transformErrorResponse: errorHandler,
      transformResponse: transformResponse,

      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data: profile } = await queryFulfilled;
          dispatch(setUserProfile(profile));
        } catch (error) {}
      },
    }),
    updateProfile: builder.mutation({
      query: ({ endpoint, data }) => ({
        url: endpoint,
        method: "PATCH",
        body: data,
      }),
      transformErrorResponse: errorHandler,
      transformResponse: transformResponse,
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserProfile(data.profile));
        } catch (error) {}
      },
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApiSlice;

export default profileApiSlice;
