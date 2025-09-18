import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  showToast: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onToggle,
  showToast,
}) => {
  return (
    <div style={styles.wrapper}>
      <button
        onClick={onToggle}
        style={{
          ...styles.button,
          backgroundColor: isFavorite ? '#FE6D8E' : '#0ACF83',
        }}
      >
        {isFavorite ? '★ Remove' : '☆ Add to My Library'}
      </button>

      {showToast && (
        <div style={styles.toast}>
          {isFavorite ? 'Added to your library!' : 'Removed from your library!'}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    marginTop: '0.5rem',
    width: '90%',
    position: 'relative',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  button: {
    width: '100%',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '15px',
    color: '#00000080',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  toast: {
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
    whiteSpace: 'nowrap',
    textAlign: 'center',
  },
};

export default FavoriteButton;
