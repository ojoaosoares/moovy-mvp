import React from 'react';
import { FavoriteDTO } from '../types';
import FavoriteButton from './FavoriteButton';
import AudioControl from './AudioControl';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { useSetFavorite } from '../hooks/useToggleFavorite';

interface MovieCardProps {
  movie: FavoriteDTO;
  favorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, favorite }) => {
  const { isFavorite, showToast, toggleFavorite } = useSetFavorite(
    movie,
    favorite
  );
  const { isPlaying, setIsPlaying, audioRef, togglePlay } = useAudioPlayer();

  return (
    <div
      key={movie.imdbID}
      style={{
        flex: '0 1 250px',
        width: 'calc(33% - 1rem)',
        border: '1px solid #ccc',
        padding: '0.5rem 0',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
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
          <AudioControl
            audioPath={movie.audioPath}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            audioRef={audioRef}
            setIsPlaying={setIsPlaying}
          />
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
          margin: '0.5rem auto 0 auto',
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

      <FavoriteButton
        isFavorite={isFavorite}
        onToggle={toggleFavorite}
        showToast={showToast}
      />
    </div>
  );
};

export default MovieCard;
