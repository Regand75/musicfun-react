import type { ShortPlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';
import s from './PlaylistDescription.module.css';

type Props = {
  attributes: ShortPlaylistAttributes;
};

export const PlaylistDescription = ({ attributes }: Props) => {
  return (
    <>
      <div className={s.truncateText}>title: {attributes.title}</div>
      <div>userName: {attributes.user.name}</div>
    </>
  );
};
