import type { PlaylistData, ShortPlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';

type Props = {
  playlist: PlaylistData<ShortPlaylistAttributes>;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlistId: string) => void;
};

export const PlaylistItem = ({ playlist, deletePlaylist, editPlaylist }: Props) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist.id)}>update</button>
    </div>
  );
};
