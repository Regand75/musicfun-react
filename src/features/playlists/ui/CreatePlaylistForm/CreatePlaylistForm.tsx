import { type SubmitHandler, useForm } from 'react-hook-form';
import type { CreatePlaylistArgsAttributes } from '@/features/playlists/api/playlistsApi.types.ts';
import { useCreatePlaylistMutation } from '@/features/playlists/api/playlistsApi.ts';

export const CreatePlaylistForm = () => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgsAttributes>();

  const [createPlaylist] = useCreatePlaylistMutation();

  const onSubmit: SubmitHandler<CreatePlaylistArgsAttributes> = (value) => {
    createPlaylist({
      data: {
        type: 'playlists',
        attributes: value,
      },
    })
      .unwrap()
      .then(() => {
        reset();
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new playlist</h2>
      <div>
        <input {...register('title')} placeholder={'title'} />
      </div>
      <div>
        <input {...register('description')} placeholder={'description'} />
      </div>
      <button>create playlist</button>
    </form>
  );
};
