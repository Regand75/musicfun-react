import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreatePlaylistArgs,
  PlaylistResponse,
  PlaylistsResponse,
} from '@/features/playlists/api/playlistsApi.types';

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
  }),
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => `playlists`,
    }),
    createPlaylists: build.mutation<PlaylistResponse, CreatePlaylistArgs>({
      query: (body) => ({ method: 'post', url: `playlists`, body }),
    }),
  }),
});

export const { useFetchPlaylistsQuery, useCreatePlaylistsMutation } = playlistsApi;
