import React, { useState, useRef } from 'react';
import { MovieDto } from '../types';

interface MovieCardProps {
  movie: MovieDto;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);
  const [showToast, setShowToast] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

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
          {
            method: 'DELETE',
          }
        );
        if (!res.ok) throw new Error('Failed to remove favorite');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
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
          margin: '0 auto',
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          background: 'linear-gradient(to bottom, #fff, #2b2121)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {movie.Poster ? (
          <img
            src={movie.Poster}
            alt={movie.Title || 'No Title'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              color: 'transparent',
            }}
          />
        ) : (
          <span style={{ color: '#fff' }}>No Poster</span>
        )}

        {movie.audioPath && (
          <>
            <button
              onClick={handlePlayAudio}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
                borderRadius: '30px',
                backgroundColor: 'rgba(0,0,0,0.6)',
                color: '#fff',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isPlaying ? '■' : '▶'}
            </button>
            <audio
              ref={audioRef}
              src={movie.audioPath}
              onEnded={() => setIsPlaying(false)}
            />
          </>
        )}
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
          marginLeft: 'auto',
          marginRight: 'auto',
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

      <div
        style={{
          marginTop: '0.5rem',
          width: '90%',
          position: 'relative',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
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
