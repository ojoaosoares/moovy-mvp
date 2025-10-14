import { useState, useEffect } from 'react';
import { HasFavoriteDTO } from '../types';
import { LibraryService } from '../modules/library/library.service';

const libraryService = new LibraryService();
// TODO reiniciar o component quando puxar para baixo, 
// e adicionar mounted pra evitar que o estado seja atualizado depois do componente desmonstado
export function useLibrary() {
  const [movies, setMovies] = useState<HasFavoriteDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      setError(null);

      try {
        const favs = await libraryService.getFavorites();
        setMovies(favs);
      } catch (err: any) {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch favorites');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  return { movies, loading, error };
}
