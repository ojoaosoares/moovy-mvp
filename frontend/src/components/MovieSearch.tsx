import React, { useState } from 'react';
import { MovieDto } from '../types';
import SearchBar from './SearchBar';
import ShowMovies from './ShowMovies';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieDto[]>([]);

  const handleSearch = async () => {
    if (!query) return;

    setMovies([]);

    try {
      const response = await fetch(
        `http://localhost:4000/movies/search?q=${query}`
      );
      const data = await response.json();
      setMovies(data.movies || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <SearchBar value={query} onChange={setQuery} onSearch={handleSearch} />
      <ShowMovies movies={movies} />
    </div>
  );
};

export default MovieSearch;
