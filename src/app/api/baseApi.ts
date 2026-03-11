import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/app/api/baseQueryWithReauth';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Playlist', 'Track', 'Auth'],
  endpoints: () => ({}),
  // skipSchemaValidation: process.env.NODE_ENV === 'production',
});
