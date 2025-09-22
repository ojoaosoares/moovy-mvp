import { useState } from 'react';
import { HasFavoriteDTO } from '../types';
import { MovieService } from '../modules/search/search.service';

const movieService = new MovieService();

export function useMovieSearch() {
  const [movies, setMovies] = useState<HasFavoriteDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query) return;

    setLoading(true);
    setError(null);
    setMovies([]);

    try {
      const results = await movieService.searchMoviesWithFavorites(query);
      setMovies(results);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, search };
}
