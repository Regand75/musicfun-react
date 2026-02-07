import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreatePlaylistArgsAttributes,
  PlaylistResponse,
  PlaylistsArgs,
  PlaylistsResponse,
  UpdatePlaylistArgsAttributes,
} from '@/features/playlists/api/playlistsApi.types';

export const playlistsApi = createApi({
  reducerPath: 'playlistsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      'API-KEY': import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`);
      return headers;
    },
  }),
  tagTypes: ['Playlists'],
  endpoints: (build) => ({
    fetchPlaylists: build.query<PlaylistsResponse, void>({
      query: () => `playlists`,
      providesTags: ['Playlists'],
    }),
    getPlaylist: build.query<PlaylistResponse, string>({
      query: (playlistId) => `playlists/${playlistId}`,
      providesTags: ['Playlists'],
    }),
    createPlaylists: build.mutation<PlaylistResponse, PlaylistsArgs<CreatePlaylistArgsAttributes>>({
      query: (body) => ({ method: 'post', url: `playlists`, body }),
      invalidatesTags: ['Playlists'],
    }),
    deletePlaylists: build.mutation<void, string>({
      query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
      invalidatesTags: ['Playlists'],
    }),
    updatePlaylists: build.mutation<void, { playlistId: string; body: PlaylistsArgs<UpdatePlaylistArgsAttributes> }>({
      query: ({ playlistId, body }) => ({ method: 'put', url: `playlists/${playlistId}`, body }),
      invalidatesTags: ['Playlists'],
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistsMutation,
  useDeletePlaylistsMutation,
  useUpdatePlaylistsMutation,
} = playlistsApi;
