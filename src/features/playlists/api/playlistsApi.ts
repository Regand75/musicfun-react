import type {
  CreatePlaylistArgsAttributes,
  PlaylistResponse,
  PlaylistsArgs,
  PlaylistsResponse,
  UpdatePlaylistArgsAttributes,
} from '@/features/playlists/api/playlistsApi.types';
import { baseApi } from '@/app/app/baseApi';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
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
    uploadPlaylistCover: build.mutation<Images, { playlistId: string; file: File }>({
      query: ({ playlistId, file }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `playlists/${playlistId}/images/main`,
          method: 'post',
          body: formData,
        };
      },
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
  useUploadPlaylistCoverMutation,
} = playlistsApi;
