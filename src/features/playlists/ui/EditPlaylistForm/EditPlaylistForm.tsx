import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister } from 'react-hook-form';
import type { UpdatePlaylistArgsAttributes } from '@/features/playlists/api/playlistsApi.types';
import { useUpdatePlaylistsMutation } from '@/features/playlists/api/playlistsApi';

type Props = {
  playlistId: string;
  setPlaylistId: (playlistId: null) => void;
  editPlaylist: (playlistId: null) => void;
  register: UseFormRegister<UpdatePlaylistArgsAttributes>;
  handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgsAttributes>;
};

export const EditPlaylistForm = ({ playlistId, setPlaylistId, editPlaylist, register, handleSubmit }: Props) => {
  const [updatePlaylists] = useUpdatePlaylistsMutation();

  const onSubmit: SubmitHandler<UpdatePlaylistArgsAttributes> = (data) => {
    if (!playlistId) return;
    updatePlaylists({
      playlistId,
      body: {
        data: {
          type: 'playlists',
          attributes: data,
        },
      },
    })
      .unwrap()
      .then(() => setPlaylistId(null));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edit playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button type={'submit'}>save</button>
      <button type={'button'} onClick={() => editPlaylist(null)}>
        cancel
      </button>
    </form>
  );
};
