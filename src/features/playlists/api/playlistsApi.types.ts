import type { CurrentUserReaction } from '@/common/enums';
import type { Images, Tag, User } from '@/common/types';

export type PlaylistsResponse<T = ShortPlaylistAttributes> = {
  data: PlaylistData<T>[];
  meta: PlaylistMeta;
};

export type PlaylistResponse<T = FullPlaylistAttributes> = {
  data: PlaylistData<T>;
};

export type PlaylistData<T = FullPlaylistAttributes> = {
  id: string;
  type: 'playlists';
  attributes: T;
};

export type PlaylistMeta = {
  page: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
};

export type FullPlaylistAttributes = {
  title: string;
  description: string;
  addedAt: string;
  updatedAt: string;
  order: number;
  user: User;
  images: Images;
  tags: Tag[];
  likesCount: number;
  dislikesCount: number;
  currentUserReaction: CurrentUserReaction;
  tracksCount: number;
};

export type ShortPlaylistAttributes = Omit<FullPlaylistAttributes, 'description'>;

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

export type CreatePlaylistArgs = {
  data: {
    type: 'playlists';
    attributes: CreatePlaylistArgsAttributes;
  };
};

export type CreatePlaylistArgsAttributes = {
  title: string;
  description: string;
};
