import React from 'react';
import SearchBar from '../components/SearchBar';
import ShowMovies from '../components/ShowMovies';
import { useMovieSearch } from '../hooks/useSearch';

const SearchScreen: React.FC = () => {
  const { movies, firstRun, loading, error, setQuery, input, setInput, suggestion } = useMovieSearch();

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
          value={input}
          onChange={setInput}
          onSearch={() => {
            setQuery(input);
          }}
          suggestion={suggestion}
        />

        {!firstRun && loading && <p>Loading...</p>}
        {!firstRun && error && <p>{error}</p>}
        {!firstRun && !loading && movies.length > 0 && (
          <ShowMovies movies={movies} />
        )}
        {!firstRun && !loading && movies.length === 0 && !error && (
          <h3>No movies found. Try a different search.</h3>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
