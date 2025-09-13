import React, { useState } from 'react';
import { MovieDto } from '../types';
import { Search } from 'lucide-react';

const MovieSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setMovies([]);

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:4000/movies/search?q=${query}`
      );
      const data = await response.json();
      console.log(data.movies);
      setMovies(data.movies || []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
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
            style={{
              width: '100%',
              borderRadius: '15px',
              border: '1px solid #dedede',
              padding: '0.5rem 2.5rem 0.5rem 0.8rem',
              boxSizing: 'border-box',
            }}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie"
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

      {loading && <p>Loading...</p>}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          width: '100%',
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              flex: '0 1 calc(33.333% - 1rem)',
              border: '1px solid #ccc',
              padding: '1rem',
              boxSizing: 'border-box',
              textAlign: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <div
              style={{
                width: '150px',
                height: '225px',
                backgroundColor: '#ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#555',
                fontSize: '0.9rem',
              }}
            >
              <img
                src={movie.Poster || ''}
                alt={movie.Title}
                style={{ width: '150px', height: '225px', objectFit: 'cover' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {!movie.Poster && 'No Poster'}
            </div>
            <div>
              <h3>
                {movie.Title}
                <span
                  style={{
                    marginLeft: '0.6em',
                    fontWeight: 400,
                    color: '#444',
                  }}
                >
                  <span style={{ color: '#FFD700' }}>★</span>
                  {movie.imdbRating}
                </span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearch;
