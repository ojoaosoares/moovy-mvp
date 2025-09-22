import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ShowMovies from '../components/ShowMovies';
import { useMovieSearch } from '../hooks/useSearch';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const { movies, loading, error, search } = useMovieSearch();

  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginLeft: '2.2rem' }}>Search</h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => search(query)}
        />

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && movies.length > 0 && <ShowMovies movies={movies} />}
        {!loading && movies.length === 0 && !error && (
          <h3>No movies found. Try a different search.</h3>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
