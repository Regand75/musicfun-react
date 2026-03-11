import * as z from 'zod';
import { currentUserReactionSchema, imagesSchema, tagSchema, userSchema } from '@/common/schemas';

export const PlaylistMetaSchema = z.object({
  page: z.int().positive(),
  pageSize: z.int().positive(),
  totalCount: z.int().positive(),
  pagesCount: z.int().positive(),
});

export const FullPlaylistAttributesSchema = z.object({
  title: z.string(),
  description: z.string(),
  addedAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
  order: z.int(),
  user: userSchema,
  images: imagesSchema,
  tags: z.array(tagSchema),
  likesCount: z.int().nonnegative(),
  dislikesCount: z.int().nonnegative(),
  currentUserReaction: currentUserReactionSchema,
  tracksCount: z.int().nonnegative(),
});

export const ShortPlaylistAttributesSchema = FullPlaylistAttributesSchema.omit({
  description: true,
});

export const PlaylistDataSchema = <T extends z.ZodTypeAny>(attributesSchema: T) =>
  z.object({
    id: z.string(),
    type: z.literal('playlists'),
    attributes: attributesSchema,
  });

export const FullPlaylistDataSchema = PlaylistDataSchema(FullPlaylistAttributesSchema);
export const ShortPlaylistDataSchema = PlaylistDataSchema(ShortPlaylistAttributesSchema);

export const PlaylistResponseSchema = z.object({
  data: PlaylistDataSchema(FullPlaylistAttributesSchema),
});

export const PlaylistsResponseSchema = z.object({
  data: z.array(PlaylistDataSchema(ShortPlaylistAttributesSchema)),
  meta: PlaylistMetaSchema,
});

export const CreatePlaylistArgsAttributesSchema = z.object({
  title: z
    .string()
    .min(1, 'The title length must be more than 1 character')
    .max(100, 'The title length must be less than 100 characters'),
  description: z.string().max(1000, 'The description length must be less than 1000 characters.'),
});

export const UpdatePlaylistArgsAttributesSchema = z.object({
  title: z
    .string()
    .min(1, 'The title length must be more than 1 character')
    .max(100, 'The title length must be less than 100 characters'),
  description: z.string().max(1000, 'The description length must be less than 1000 characters.'),
  tagIds: z.array(z.string()),
});

const createPlaylistArgsSchema = <T extends z.ZodTypeAny>(attributesSchema: T) =>
  z.object({
    data: z.object({
      type: z.literal('playlists'),
      attributes: attributesSchema,
    }),
  });

export const CreatePlaylistArgsSchema = createPlaylistArgsSchema(CreatePlaylistArgsAttributesSchema);
export const UpdatePlaylistArgsSchema = createPlaylistArgsSchema(UpdatePlaylistArgsAttributesSchema);
