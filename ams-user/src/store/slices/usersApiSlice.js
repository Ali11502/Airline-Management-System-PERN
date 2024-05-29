import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/api/auth/login',
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
    register: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/api/auth/register',
        method: 'POST',
        body: data,
        credentials:'include',
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: 'http://localhost:5000/api/users/update',
        method: 'PUT',
        body: data,
        credentials:'include',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;