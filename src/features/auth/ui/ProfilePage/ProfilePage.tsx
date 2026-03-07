import { useGetMeQuery } from '@/features/auth/api/authApi.ts';
import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import { CreatePlaylistForm, PlaylistList } from '@/features/playlists/ui';
import s from './ProfilePage.module.css';
import { Navigate } from 'react-router';
import { Path } from '@/common/routing/paths';

export const ProfilePage = () => {
  const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery();
  const { data: playlistsData, isLoading } = useFetchPlaylistsQuery(
    { userId: meResponse?.userId },
    { skip: !meResponse?.userId },
  );

  if (isLoading || isMeLoading) return <h1>Skeleton loader...</h1>;

  if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />;

  return (
    <div>
      <h1>{meResponse?.login} page</h1>
      <div className={s.container}>
        <CreatePlaylistForm />
        <PlaylistList playlist={playlistsData?.data || []} isPlaylistsLoading={isLoading || isMeLoading} />
      </div>
    </div>
  );
};
