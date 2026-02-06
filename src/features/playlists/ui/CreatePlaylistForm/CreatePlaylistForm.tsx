import { type SubmitHandler, useForm } from 'react-hook-form';
import type { CreatePlaylistArgsAttributes } from '@/features/playlists/api/playlistsApi.types.ts';
import { useCreatePlaylistsMutation } from '@/features/playlists/api/playlistsApi.ts';

export const CreatePlaylistForm = () => {
  const { register, handleSubmit } = useForm<CreatePlaylistArgsAttributes>();

  const [createPlaylists] = useCreatePlaylistsMutation();

  const onSubmit: SubmitHandler<CreatePlaylistArgsAttributes> = (value) => {
    createPlaylists({
      data: {
        type: 'playlists',
        attributes: value,
      },
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
