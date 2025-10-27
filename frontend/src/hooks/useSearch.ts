import { useQuery } from '@tanstack/react-query';
import { HasFavoriteDTO } from '../types';
import { SearchService } from '../modules/search/search.service';
import { useEffect, useState } from 'react';

const searchService = new SearchService();

export function useMovieSearch() {
  const [query, setQuery] = useState('');
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInput(input), 500);
    return () => clearTimeout(timer);
  }, [input]);

  const { data: suggestionMovies } = useQuery<HasFavoriteDTO[]>({
    queryKey: ['movies', debouncedInput.trim().toLowerCase()],
    queryFn: () => searchService.searchMoviesWithFavorites(debouncedInput),
    enabled: !!debouncedInput,
    staleTime: 1000 * 60 * 5,
  });

  const { data, isLoading, error } = useQuery<HasFavoriteDTO[]>({
    queryKey: ['movies', query.trim().toLowerCase()],
    queryFn: () => searchService.searchMoviesWithFavorites(query),
    enabled: !!query,
    staleTime: 1000 * 60 * 5,
  });

  const firstRun = !query;

  const suggestionTitles: string[] = suggestionMovies
    ?.map(item => item?.favorite?.title)
    .filter((title): title is string => !!title) ?? [];


  return {
    movies: data ?? [],
    firstRun,
    loading: isLoading,
    error: error?.message ?? null,
    setQuery,
    input,
    setInput,
    suggestion: suggestionTitles,
  };
}
