import React, { useState } from 'react';
import { MovieDto } from '../types';
import { Search } from 'lucide-react';
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
      <div
        style={{
          width: '70%',
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="Search for a movie"
            style={{
              width: '100%',
              borderRadius: '15px',
              border: '1px solid #dedede',
              padding: '0.5rem 2.5rem 0.5rem 0.8rem',
              boxSizing: 'border-box',
            }}
          />
          <span
            onClick={handleSearch}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              cursor: 'pointer',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Search size={20} color="#000" />
          </span>
        </div>
      </div>
      <ShowMovies movies={movies} />
    </div>
  );
};

export default MovieSearch;
