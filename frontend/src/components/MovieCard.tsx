import React from 'react';

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
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        {!movie.Poster && 'No Poster'}
      </div>

      <div
        style={{
          marginTop: '0.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 0.5rem',
          width: '90%',
        }}
      >
        <h3
          style={{
            textAlign: 'left',
            fontFamily: 'Arial, sans-serif',
            fontSize: '1rem',
            margin: 0,
            width: '70%',
          }}
        >
          {movie.Title || 'No Title'}
        </h3>

        <span
          style={{
            fontWeight: 400,
            color: '#444',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          <span style={{ color: '#FFD700' }}>★</span>
          {movie.imdbRating || '-'}
        </span>
      </div>

      <div style={{ marginTop: '0.5rem', width: '90%' }}>
        <button
          style={{
            width: '100%',
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "15px",
            backgroundColor: movie.isFavorite ? "gold" : "#0ACF83",
            color: movie.isFavorite ? "#000" : "#00000080",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {movie.isFavorite ? "★ Favorito" : "☆ Add to My Library"}
      </button>
      </div>
    </div>
  );
};

export default MovieCard;
