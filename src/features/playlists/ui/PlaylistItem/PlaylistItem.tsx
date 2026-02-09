import type { PlaylistData, ShortPlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';
import s from './PlaylistItem.module.css';
import defaultCover from '@/assets/images/default-playlist-cover.png';
import { useUploadPlaylistCoverMutation } from '@/features/playlists/api/playlistsApi.ts';
import type { ChangeEvent } from 'react';

type Props = {
  playlist: PlaylistData<ShortPlaylistAttributes>;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlistId: string) => void;
};

export const PlaylistItem = ({ playlist, deletePlaylist, editPlaylist }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();

  const uploadPlaylistCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.length && event.target.files[0];
    if (!file) return;
    uploadPlaylistCover({ playlistId: playlist.id, file });
  };

  const originalCover = playlist.attributes.images.main?.find((img) => img.type === 'original');
  const src = originalCover ? originalCover?.url : defaultCover;

  return (
    <div>
      <img src={src} alt={'cover'} width={'100px'} className={s.cover} />
      <input type="file" onChange={uploadPlaylistCoverHandler} />
      <div>title: {playlist.attributes.title}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist.id)}>update</button>
    </div>
  );
};
