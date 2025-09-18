import React from 'react';

interface AudioControlProps {
  audioPath: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsPlaying: (value: boolean) => void;
}

const AudioControl: React.FC<AudioControlProps> = ({
  audioPath,
  isPlaying,
  onTogglePlay,
  audioRef,
  setIsPlaying,
}) => {
  return (
    <>
      <button onClick={onTogglePlay} style={styles.button}>
        {isPlaying ? '■' : '▶'}
      </button>
      <audio
        ref={audioRef}
        src={audioPath}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  button: {
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
  },
};

export default AudioControl;
