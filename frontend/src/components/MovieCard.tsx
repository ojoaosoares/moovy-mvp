import React, { useState } from 'react';

interface Movie {
  imdbID: string;
  Title?: string;
  Poster?: string;
  imdbRating?: string | number;
  isFavorite?: boolean;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);
  const [showToast, setShowToast] = useState(false);

  const handleToggleFavorite = async () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);

    try {
      if (newValue) {
        const res = await fetch(`http://localhost:4000/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(movie),
        });
        if (!res.ok) throw new Error('Failed to add favorite');
      } else {
        const res = await fetch(
          `http://localhost:4000/favorites/${movie.imdbID}`,
          { method: 'DELETE' }
        );
        if (!res.ok) throw new Error('Failed to remove favorite');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      key={movie.imdbID}
      style={{
        flex: '0 1 250px',
        width: 'calc(33% - 1rem)',
        border: '1px solid #ccc',
        padding: '0.5rem 0',
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
          width: '90%',
          height: '350px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#2b2121ff',
          fontSize: '1rem',
          background: 'linear-gradient(to bottom, #ffffffff, #2b2121ff)',
          borderRadius: '10px',
        }}
      >
        <img
          src={movie.Poster || ''}
          alt={movie.Title || 'No Title'}
          style={{
            width: '100%',
            height: '350px',
            objectFit: 'cover',
            borderRadius: '10px',
            color: 'transparent',
          }}
          onError={(e) =>
            ((e.target as HTMLImageElement).style.display = 'none')
          }
        />
        {!movie.Poster && 'No Poster'}
      </div>

      <div
        style={{
          height: '3rem',
          marginTop: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: '0 0.5rem',
          width: '90%',
        }}
      >
        <h3
          style={{
            fontWeight: '400',
            textAlign: 'left',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1rem',
            margin: 0,
            width: '80%',
          }}
        >
          {movie.Title || 'No Title'}
        </h3>

        <div style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
          <span
            style={{
              color: '#FFD700',
              fontSize: '1.5rem',
              lineHeight: 1,
              marginTop: '-0.3rem',
            }}
          >
            ★
          </span>
          <span style={{ marginLeft: '0.2rem', color: '#444', lineHeight: 1 }}>
            {movie.imdbRating || '-'}
          </span>
        </div>
      </div>

      <div style={{ marginTop: '0.5rem', width: '90%', position: 'relative' }}>
        <button
          onClick={handleToggleFavorite}
          style={{
            width: '100%',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '15px',
            backgroundColor: isFavorite ? '#FE6D8E' : '#0ACF83',
            color: '#00000080',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          {isFavorite ? '★ Remove' : '☆ Add to My Library'}
        </button>

        {showToast && (
          <div
            style={{
              position: 'absolute',
              top: '-3rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #eb8b8bff 0%, #F2911B 100%)',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              fontSize: '0.85rem',
              fontWeight: '500',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              pointerEvents: 'none',
              opacity: 0.95,
              transition: 'transform 0.2s ease, opacity 0.3s ease',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}
          >
            {isFavorite
              ? 'Added to your library!'
              : 'Removed from your library!'}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
