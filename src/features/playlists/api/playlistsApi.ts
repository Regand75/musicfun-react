import type {
  CreatePlaylistArgsAttributes,
  FetchPlaylistsArgs,
  PlaylistResponse,
  PlaylistsArgs,
  PlaylistsResponse,
  UpdatePlaylistArgsAttributes,
} from '@/features/playlists/api/playlistsApi.types';
import { baseApi } from '@/app/api/baseApi';
import type { Images } from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
        query: (params) => ({ url: `playlists`, params }),
        providesTags: ['Playlist'],
      }),
      getPlaylist: build.query<PlaylistResponse, string>({
        query: (playlistId) => `playlists/${playlistId}`,
        providesTags: ['Playlist'],
      }),
      createPlaylists: build.mutation<PlaylistResponse, PlaylistsArgs<CreatePlaylistArgsAttributes>>({
        query: (body) => ({ method: 'post', url: `playlists`, body }),
        invalidatesTags: ['Playlist'],
      }),
      deletePlaylists: build.mutation<void, string>({
        query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
        invalidatesTags: ['Playlist'],
      }),
      updatePlaylists: build.mutation<void, { playlistId: string; body: PlaylistsArgs<UpdatePlaylistArgsAttributes> }>({
        query: ({ playlistId, body }) => ({ method: 'put', url: `playlists/${playlistId}`, body }),
        invalidatesTags: ['Playlist'],
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
        invalidatesTags: ['Playlist'],
      }),
      deletePlaylistCover: build.mutation<void, string>({
        query: (playlistId) => ({ url: `playlists/${playlistId}/images/main`, method: 'delete' }),
        invalidatesTags: ['Playlist'],
      }),
    };
  },
});

export const {
  useFetchPlaylistsQuery,
  useGetPlaylistQuery,
  useCreatePlaylistsMutation,
  useDeletePlaylistsMutation,
  useUpdatePlaylistsMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
