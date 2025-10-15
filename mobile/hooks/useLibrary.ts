import { useState, useEffect, useRef, useCallback } from 'react';
import { HasFavoriteDTO } from '../types';
import { LibraryService } from '../modules/library/library.service';

const libraryService = new LibraryService();

export function useLibrary() {
  const [movies, setMovies] = useState<HasFavoriteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const mounted = useRef(true);

  const fetchFavorites = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    setError(null);

    try {
      const favs = await libraryService.getFavorites();

      if (mounted.current) {
        setMovies(favs);
      }
    } catch (err: any) {
      console.error('Error fetching favorites:', err);
      if (mounted.current) {
        setError('Failed to fetch favorites');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    fetchFavorites();

    return () => {
      mounted.current = false;
    };
  }, [fetchFavorites]);

  const onRefresh = useCallback(async () => {
    if (!mounted.current) return;

    setRefreshing(true);
    await fetchFavorites();

    if (mounted.current) {
      setRefreshing(false);
    }
  }, [fetchFavorites]);

  return { movies, loading, error, refreshing, onRefresh };
}
