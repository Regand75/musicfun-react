import type { ShortPlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  attributes: ShortPlaylistAttributes;
};

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <>
      <div>title: {attributes.title}</div>
      <div>userName: {attributes.user.name}</div>
    </>
  );
};
