import { useFetchPlaylistsQuery } from '@/features/playlists/api/playlistsApi';
import s from './PlaylistsPage.module.css';
import { CreatePlaylistForm } from '@/features/playlists/ui/CreatePlaylistForm/CreatePlaylistForm.tsx';
import { type ChangeEvent, useState } from 'react';
import { useDebounceValue } from '@/common/hooks';
import { Pagination } from '@/common/components';
import { PlaylistList } from '@/features/playlists/ui/PlaylistList/PlaylistList';

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [search, setSearch] = useState('');
  const debounceSearch = useDebounceValue(search);
  const { data: playlistsData, isLoading } = useFetchPlaylistsQuery({
    search: debounceSearch,
    pageNumber: currentPage,
    pageSize,
  });

  const setPageSizeHandler = (size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const searchPlaylistHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
    setCurrentPage(1);
  };

  return (
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <input type="search" placeholder={'Search playlist by title'} onChange={searchPlaylistHandler} />
      <PlaylistList playlist={playlistsData?.data || []} isPlaylistsLoading={isLoading} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pagesCount={playlistsData?.meta.pagesCount || 1}
        pageSize={pageSize}
        changePageSize={setPageSizeHandler}
      />
    </div>
  );
};
