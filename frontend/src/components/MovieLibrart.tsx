import React, { useState, useEffect } from 'react';
import { MovieDto } from '../types';
import ShowMovies from './ShowMovies';

const MovieLibrary: React.FC = () => {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:4000/favorites');
        const data = await response.json();

        console.log(data);

        const favoritesWithFlag = (data.favorites || []).map(
          (movie: Partial<MovieDto>) => ({
            ...movie,
            isFavorite: true,
          })
        );
        console.log(favoritesWithFlag);
        setMovies(favoritesWithFlag);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginLeft: '2.2rem' }}> Library</h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {movies.length > 0 && <ShowMovies movies={movies} />}
        {movies.length === 0 && !loading && <h3>Library Empty</h3>}
      </div>
    </div>
  );
};

export default MovieLibrary;
