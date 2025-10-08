import { useQuery } from '@tanstack/react-query';
import { HasFavoriteDTO } from '../types';
import { SearchService } from '../modules/search/search.service';
import { useState } from 'react';

const searchService = new SearchService();

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const { data, isLoading, error } = useQuery<HasFavoriteDTO[]>({
    queryKey: ['movies', query],
    queryFn: () => searchService.searchMoviesWithFavorites(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const firstRun = !query;

  return {
    movies: data ?? [],
    firstRun,
    loading: isLoading,
    error: error?.message ?? null,
    setQuery,
  };
}
