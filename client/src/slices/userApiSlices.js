import { USER_URL } from '../constants';
import { apiSlice } from './apiSlices';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    verify: builder.query({
      query: (uid) => ({
        url: `${USER_URL}/verify?uid=${uid}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useRegisterMutation, useVerifyQuery } = userApiSlice;
