import type { PlaylistData, ShortPlaylistAttributes } from '@/features/playlists/api/playlistsApi.types';
import { PlaylistCover, PlaylistDescription } from '@/features/playlists/ui';

type Props = {
  playlist: PlaylistData<ShortPlaylistAttributes>;
  deletePlaylist: (playlistId: string) => void;
  editPlaylist: (playlistId: string) => void;
};

export const PlaylistItem = ({ playlist, deletePlaylist, editPlaylist }: Props) => {
  return (
    <div>
      <PlaylistCover playlistId={playlist.id} images={playlist.attributes.images} />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => deletePlaylist(playlist.id)}>delete</button>
      <button onClick={() => editPlaylist(playlist.id)}>update</button>
    </div>
  );
};
