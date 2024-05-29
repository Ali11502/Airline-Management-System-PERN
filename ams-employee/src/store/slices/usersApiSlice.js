import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/api/erpAuth/login',
        method: 'POST',
        body: data,
        credentials:'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'http://localhost:5000/api/auth/logout',
        method: 'POST',
        credentials:'include'
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation
} = userApiSlice;