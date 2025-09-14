import React, { useState } from 'react';
import { MovieDto } from '../types';
import SearchBar from './SearchBar';
import ShowMovies from './ShowMovies';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [onSearch, setOnSearch] = useState(true);

  const handleSearch = async () => {
    if (!query) return;
    setOnSearch(true);
    setMovies([]);

    try {
      const response = await fetch(
        `http://localhost:4000/movies/search?q=${query}`
      );
      const data = await response.json();
      const moviesWithFavorite = await Promise.all(
        (data.movies || []).map(async (movie: Partial<MovieDto>) => {
          try {
            const res = await fetch(
              `http://localhost:4000/favorites/${movie.imdbID}`
            );
            const json = await res.json();
            return { ...movie, isFavorite: json.isFavorite };
          } catch {
            return { ...movie, isFavorite: false };
          }
        })
      );
      setMovies(moviesWithFavorite);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }

    setOnSearch(false);
  };

  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginLeft: '2.2rem' }}> Search</h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />

        {movies.length > 0 && <ShowMovies movies={movies} />}
        {!onSearch && movies.length === 0 && (
          <h3>No movies found. Try a different search.</h3>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
