import {
  CreatePlaylistArgsAttributesSchema,
  CreatePlaylistArgsSchema,
  FullPlaylistAttributesSchema,
  FullPlaylistDataSchema,
  PlaylistMetaSchema,
  PlaylistResponseSchema,
  PlaylistsResponseSchema,
  ShortPlaylistDataSchema,
  UpdatePlaylistArgsAttributesSchema,
  UpdatePlaylistArgsSchema,
} from '@/features/playlists/model/playlists.schemas';
import * as z from 'zod';

export type PlaylistMeta = z.infer<typeof PlaylistMetaSchema>;
export type FullPlaylistAttributes = z.infer<typeof FullPlaylistAttributesSchema>;
export type FullPlaylistData = z.infer<typeof FullPlaylistDataSchema>;
export type ShortPlaylistData = z.infer<typeof ShortPlaylistDataSchema>;
export type PlaylistResponse = z.infer<typeof PlaylistResponseSchema>;
export type PlaylistsResponse = z.infer<typeof PlaylistsResponseSchema>;
export type CreatePlaylistArgsAttributes = z.infer<typeof CreatePlaylistArgsAttributesSchema>;
export type UpdatePlaylistArgsAttributes = z.infer<typeof UpdatePlaylistArgsAttributesSchema>;
export type CreatePlaylistArgs = z.infer<typeof CreatePlaylistArgsSchema>;
export type UpdatePlaylistArgs = z.infer<typeof UpdatePlaylistArgsSchema>;

// Arguments
export type FetchPlaylistsArgs = {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sortBy?: 'addedAt' | 'likesCount';
  sortDirection?: 'asc' | 'desc';
  tagsIds?: string[];
  userId?: string;
  trackId?: string;
};

export type PlaylistCreatedEvent = {
  type: 'tracks.playlist-created';
  payload: {
    data: FullPlaylistData;
  };
};

export type PlaylistUpdateEvent = {
  type: 'tracks.playlist-updated';
  payload: {
    data: FullPlaylistData;
  };
};

// type PlaylistType = 'playlists';
//
// export type PlaylistsResponse<T = ShortPlaylistAttributes> = {
//   data: PlaylistData<T>[];
//   meta: PlaylistMeta;
// };
//
// export type PlaylistResponse<T = FullPlaylistAttributes> = {
//   data: PlaylistData<T>;
// };
//
// export type PlaylistData<T = FullPlaylistAttributes> = {
//   id: string;
//   type: PlaylistType;
//   attributes: T;
// };
//
// export type PlaylistMeta = {
//   page: number;
//   pageSize: number;
//   totalCount: number;
//   pagesCount: number;
// };
//
// export type FullPlaylistAttributes = {
//   title: string;
//   description: string;
//   addedAt: string;
//   updatedAt: string;
//   order: number;
//   user: User;
//   images: Images;
//   tags: Tag[];
//   likesCount: number;
//   dislikesCount: number;
//   currentUserReaction: CurrentUserReaction;
//   tracksCount: number;
// };
//
// export type ShortPlaylistAttributes = Omit<FullPlaylistAttributes, 'description'>;

// export type PlaylistsArgs<T> = {
//   data: PlaylistArgsData<T>;
// };
//
// export type PlaylistArgsData<T> = {
//   type: 'playlists';
//   attributes: T;
// };
//
// export type CreatePlaylistArgsAttributes = {
//   title: string;
//   description: string;
// };
//
// export type UpdatePlaylistArgsAttributes = {
//   title: string;
//   description: string;
//   tagIds: string[];
// };
