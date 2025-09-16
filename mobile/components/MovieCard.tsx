import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import { MovieDto } from '../types';

interface MovieCardProps {
  movie: MovieDto;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [audioUri, setAudioUri] = useState<string | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [needsSync, setNeedsSync] = useState(false);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    console.log('Stopping recording..');
    setRecording(null);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    setAudioUri(uri);

    setNeedsSync(true);
  };

  const playAudio = async () => {
    if (!audioUri) return;

    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const newSound = new Audio.Sound();
    try {
      await newSound.loadAsync({ uri: audioUri });
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing audio', error);
    }

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        newSound.unloadAsync();
        setSound(null);
      }
    });
  };

  const deleteAudio = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    setAudioUri(null);
  };

  const handleRecordAudio = () => {
    if (!isRecording) {
      setIsRecording(true);
      startRecording();
    } else {
      stopRecording();
    }
  };

  const handleToggleFavorite = async () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    try {
      if (newValue) {
        await fetch(`http://10.0.2.2:4000/favorites`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(movie),
        });
      } else {
        await fetch(`http://10.0.2.2:4000/favorites/${movie.imdbID}`, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {movie.Poster ? (
          <Image source={{ uri: movie.Poster }} style={styles.poster} />
        ) : (
          <Text>No Poster</Text>
        )}

        {audioUri ? (
          <View style={[styles.syncBar, needsSync ? styles.pending : styles.synced]}>
            <Text style={styles.syncText}>{needsSync ? 'pending' : 'synced'}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.favoriteBtn} onPress={handleToggleFavorite}>
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>★</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.Title || 'No Title'}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingValue}>{movie.imdbRating || '-'}</Text>
        </View>

        <View>
          {audioUri ? (
            <View style={styles.audioButtons}>
              <TouchableOpacity style={styles.playBtn} onPress={playAudio}>
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteBtn} onPress={deleteAudio}>
                <Text style={styles.deleteIcon}>🗑</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={[styles.recordBtn, isRecording && styles.recordingActive]}
              onPress={handleRecordAudio}
            >
              <Text style={styles.recordIcon}>{isRecording ? '■' : '●'}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderRadius: 12,
  },
  imageWrapper: {
    width: '100%',
    height: '75%',
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 4,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#aaa',
  },
  favoriteActive: {
    color: '#FE6D8E',
  },
  info: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'ProximaNova-Regular',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  star: {
    color: '#FFD700',
    fontSize: 15,
    marginRight: 4,
  },
  ratingValue: {
    fontSize: 15,
    color: '#444',
  },
  recordBtn: {
    marginTop: 12,
    alignSelf: 'center',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00ff26ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  recordingActive: {
    backgroundColor: '#FE6D8E',
  },
  recordIcon: {
    fontSize: 16,
    color: '#fff',
  },
  audioButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00f',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  playIcon: { color: '#fff', fontSize: 16 },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  deleteIcon: { color: '#fff', fontSize: 16 },

  syncBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  syncText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  synced: {
    backgroundColor: '#4caf50', // verde
  },
  pending: {
    backgroundColor: '#fbc02d', // amarelo
  },
});

export default MovieCard;
