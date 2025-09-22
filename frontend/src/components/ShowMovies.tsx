import React, { useState, useEffect } from 'react';
import { HasFavoriteDTO } from '../types';
import MovieCard from './MovieCard';

interface ShowMoviesProps {
  movies: HasFavoriteDTO[];
}

const ShowMovies: React.FC<ShowMoviesProps> = ({ movies }) => {
  const [displayedMovies, setDisplayedMovies] = useState<HasFavoriteDTO[]>([]);

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
        (movie) =>
          movie &&
          movie.favorite && (
            <MovieCard
              key={movie.favorite.imdbID}
              movie={movie.favorite}
              favorite={movie.hasFavorite}
            />
          )
      )}
    </div>
  );
};

export default ShowMovies;
