import React, { useState } from 'react';
import { MovieDto, HasFavoriteDTO } from '../types';
import SearchBar from '../components/SearchBar';
import ShowMovies from '../components/ShowMovies';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<HasFavoriteDTO[]>([]);
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
      const searchedMovies: MovieDto[] = data.movies || [];
      const hasFavMovies: HasFavoriteDTO[] = await Promise.all(
        searchedMovies.map(async (movie: MovieDto) => {
          try {
            const res = await fetch(
              `http://localhost:4000/favorites/${movie.imdbID}`
            );
            const favData: HasFavoriteDTO = await res.json();
            if (favData.hasFavorite) {
              return { favorite: favData.favorite, hasFavorite: true };
            }
            return { favorite: movie, hasFavorite: false };
          } catch {
            return { favorite: movie, hasFavorite: false };
          }
        })
      );
      setMovies(hasFavMovies);
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

export default SearchScreen;
