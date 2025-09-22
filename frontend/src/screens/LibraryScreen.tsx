import React from 'react';
import ShowMovies from '../components/ShowMovies';
import { useLibrary } from '../hooks/useLibrary';

const LibraryScreen: React.FC = () => {
  const { movies, loading, error } = useLibrary();

  return (
    <div style={{ width: '80%', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginLeft: '2.2rem' }}>Library</h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!loading && movies.length > 0 && <ShowMovies movies={movies} />}
        {!loading && movies.length === 0 && !error && <h3>Library Empty</h3>}
      </div>
    </div>
  );
};

export default LibraryScreen;
