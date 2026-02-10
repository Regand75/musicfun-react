import {
  useDeletePlaylistsMutation,
  useFetchPlaylistsQuery,
  useGetPlaylistQuery,
} from '@/features/playlists/api/playlistsApi';
import s from './PlaylistsPage.module.css';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';
import { PlaylistItem } from '@/features/playlists/ui/PlaylistItem/PlaylistItem';
import { EditPlaylistForm } from '@/features/playlists/ui/EditPlaylistForm/EditPlaylistForm';
import { useForm } from 'react-hook-form';
import type { UpdatePlaylistArgsAttributes } from '@/features/playlists/api/playlistsApi.types';
import { useDebounceValue } from '@/common/hooks';

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounceValue(search);
  const { data: playlistsData, isLoading } = useFetchPlaylistsQuery({ search: debounceSearch });
  const { data: playlistData } = useGetPlaylistQuery(playlistId ?? skipToken);
  const [deletePlaylists] = useDeletePlaylistsMutation();
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgsAttributes>();

  const editPlaylistHandler = (playlistId: string | null) => {
    setPlaylistId(playlistId);
  };

  useEffect(() => {
    if (!playlistData) return;
    reset({
      title: playlistData.data.attributes.title,
      description: playlistData.data.attributes.description,
      tagIds: playlistData.data.attributes.tags.map((tag) => tag.id),
    });
  }, [playlistData, reset]);

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm('Are you sure you want to delete the playlist?')) {
      deletePlaylists(playlistId);
    }
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input
        type="search"
        placeholder={'Search playlist by title'}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />
      <div className={s.items}>
        {!playlistsData?.data.length && !isLoading && <h2>Playlists not found</h2>}
        {playlistsData?.data.map((playlist) => {
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
    </div>
  );
};
