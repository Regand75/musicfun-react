import s from './PlaylistList.module.css';
import { EditPlaylistForm, PlaylistItem } from '@/features/playlists/ui';
import { useDeletePlaylistsMutation, useGetPlaylistQuery } from '@/features/playlists/api/playlistsApi';
import type {
  PlaylistData,
  ShortPlaylistAttributes,
  UpdatePlaylistArgsAttributes,
} from '@/features/playlists/api/playlistsApi.types';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { useForm } from 'react-hook-form';

type Props = {
  playlist: PlaylistData<ShortPlaylistAttributes>[];
  isPlaylistsLoading: boolean;
};

export const PlaylistList = ({ playlist, isPlaylistsLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [deletePlaylists] = useDeletePlaylistsMutation();
  const { data: playlistData } = useGetPlaylistQuery(playlistId ?? skipToken);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgsAttributes>();

  useEffect(() => {
    if (!playlistData) return;
    reset({
      title: playlistData.data.attributes.title,
      description: playlistData.data.attributes.description,
      tagIds: playlistData.data.attributes.tags.map((tag) => tag.id),
    });
  }, [playlistData, reset]);

  const editPlaylistHandler = (playlistId: string | null) => {
    setPlaylistId(playlistId);
  };

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylists(playlistId);
    }
  };

  return (
    <div className={s.items}>
      {!playlist.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
      {playlist.map((playlist) => {
        const isEditing = playlist.id === playlistId;
        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistItem
                playlist={playlist}
                deletePlaylist={deletePlaylistHandler}
                editPlaylist={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
