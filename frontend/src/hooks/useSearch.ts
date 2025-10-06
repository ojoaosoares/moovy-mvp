import { useQuery } from '@tanstack/react-query';
import { HasFavoriteDTO } from '../types';
import { SearchService } from '../modules/search/search.service';

const searchService = new SearchService();

export function useMovieSearch(query: string) {
  const { data, isLoading, error, refetch } = useQuery<HasFavoriteDTO[]>({
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
    search: refetch,
  };
}
