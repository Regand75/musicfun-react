import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistResponse,
  UpdatePlaylistArgs,
} from '@/features/playlists/api/playlistsApi.types';
import { baseApi } from '@/app/api/baseApi';
import type { Images } from '@/common/types';
import { PlaylistResponseSchema, PlaylistsResponseSchema } from '@/features/playlists/model/playlists.schemas';
import { imagesSchema } from '@/common/schemas';
import { withZodCatch } from '@/common/utils';

export const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      fetchPlaylists: build.query({
        query: (params: FetchPlaylistsArgs) => ({ url: `playlists`, params }),
        ...withZodCatch(PlaylistsResponseSchema),
        providesTags: ['Playlist'],
      }),
      getPlaylist: build.query<PlaylistResponse, string>({
        query: (playlistId) => `playlists/${playlistId}`,
        providesTags: ['Playlist'],
      }),
      createPlaylist: build.mutation({
        query: (body: CreatePlaylistArgs) => ({ method: 'post', url: `playlists`, body }),
        ...withZodCatch(PlaylistResponseSchema),
        invalidatesTags: ['Playlist'],
      }),
      deletePlaylist: build.mutation<void, string>({
        query: (playlistId) => ({ method: 'delete', url: `playlists/${playlistId}` }),
        invalidatesTags: ['Playlist'],
      }),
      updatePlaylists: build.mutation<void, { playlistId: string; body: UpdatePlaylistArgs }>({
        query: ({ playlistId, body }) => ({ method: 'put', url: `playlists/${playlistId}`, body }),
        onQueryStarted: async ({ playlistId, body }, { queryFulfilled, dispatch, getState }) => {
          const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists');
          const patchCollections: { undo: () => void }[] = [];
          args.forEach((arg) => {
            patchCollections.push(
              dispatch(
                playlistsApi.util.updateQueryData(
                  'fetchPlaylists',
                  { pageNumber: arg.pageNumber, pageSize: arg.pageSize, search: arg.search },
                  (state) => {
                    const index = state.data.findIndex((playlist) => playlist.id === playlistId);
                    if (index !== -1) {
                      state.data[index].attributes = { ...state.data[index].attributes, ...body.data.attributes };
                    }
                  },
                ),
              ),
            );
          });

          try {
            await queryFulfilled;
          } catch {
            patchCollections.forEach((patchCollection) => {
              patchCollection.undo();
            });
          }
        },
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
        ...withZodCatch(imagesSchema),
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
  useCreatePlaylistMutation,
  useDeletePlaylistMutation,
  useUpdatePlaylistsMutation,
  useUploadPlaylistCoverMutation,
  useDeletePlaylistCoverMutation,
} = playlistsApi;
