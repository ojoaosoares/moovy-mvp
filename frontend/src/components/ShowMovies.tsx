import React, { useState, useEffect } from 'react';
import { MovieDto } from '../types';

interface ShowMoviesProps {
  movies: MovieDto[];
}

const ShowMovies: React.FC<ShowMoviesProps> = ({ movies }) => {
  const [displayedMovies, setDisplayedMovies] = useState<MovieDto[]>([]);

  useEffect(() => {
    let index = 0;
    setDisplayedMovies([]);

    const interval = setInterval(() => {
      if (index < movies.length) {
        const movie = movies[index];
        if (movie) setDisplayedMovies((prev) => [...prev, movie]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [movies]);

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
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          width: '100%',
        }}
      >
        {displayedMovies.map(
          (movie) =>
            movie && (
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
                  transition: 'opacity 0.1s ease',
                  opacity: 1,
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
                    alt={movie.Title || 'No Title'}
                    style={{
                      width: '150px',
                      height: '225px',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {!movie.Poster && 'No Poster'}
                </div>
                <div>
                  <h3>
                    {movie.Title || 'No Title'}
                    <span
                      style={{
                        marginLeft: '0.6em',
                        fontWeight: 400,
                        color: '#444',
                      }}
                    >
                      <span style={{ color: '#FFD700' }}>★</span>
                      {movie.imdbRating || '-'}
                    </span>
                  </h3>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ShowMovies;
