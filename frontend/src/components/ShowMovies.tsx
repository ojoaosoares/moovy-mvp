import React, { useState, useEffect } from 'react';
import { MovieDto } from '../types';
import MovieCard from './MovieCard';

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
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '1rem',
        width: '100%',
        padding: '1rem',
      }}
    >
      {displayedMovies.map(
        (movie) => movie && <MovieCard key={movie.imdbID} movie={movie} />
      )}
    </div>
  );
};

export default ShowMovies;
