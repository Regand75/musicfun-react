import { type SubmitHandler, useForm } from 'react-hook-form';
import type { CreatePlaylistArgsAttributes } from '@/features/playlists/api/playlistsApi.types.ts';
import { useCreatePlaylistsMutation } from '@/features/playlists/api/playlistsApi.ts';

type Props = {
  onCreated: () => void;
};

export const CreatePlaylistForm = ({ onCreated }: Props) => {
  const { register, handleSubmit, reset } = useForm<CreatePlaylistArgsAttributes>();

  const [createPlaylists] = useCreatePlaylistsMutation();

  const onSubmit: SubmitHandler<CreatePlaylistArgsAttributes> = (value) => {
    createPlaylists({
      data: {
        type: 'playlists',
        attributes: value,
      },
    })
      .unwrap()
      .then(() => {
        reset();
        onCreated();
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
