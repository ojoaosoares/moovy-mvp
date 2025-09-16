import React, { useState, useEffect } from 'react';
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

  const syncAudio = async () => {
    if (!audioUri || !needsSync) return;

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        name: `audio_${movie.imdbID}.m4a`,
        type: 'audio/m4a',
      } as any);

      await fetch(`http://10.0.2.2:4000/favorites/audio/${movie.imdbID}`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      console.log('Áudio sincronizado!');
      setNeedsSync(false);
    } catch (err) {
      console.log('Erro ao sincronizar ou sem conexão. Tentaremos depois...', err);
    }
  };

  useEffect(() => {
    if (audioUri && needsSync) {
      syncAudio();
    }
  }, [audioUri, needsSync]);

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setRecording(null);
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setAudioUri(uri);
    setNeedsSync(true);
  };

  const handleRecordAudio = () => {
    if (!isRecording) startRecording();
    else stopRecording();
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
    } catch (err) {
      console.error(err);
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
    setNeedsSync(false);
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

        {audioUri && (
          <View style={[styles.syncBar, needsSync ? styles.pending : styles.synced]}>
            <Text style={styles.syncText}>{needsSync ? 'pending' : 'synced'}</Text>
          </View>
        )}

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
  poster: { width: '100%', height: '100%' },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 4,
    elevation: 4,
  },
  favoriteIcon: { fontSize: 20, color: '#aaa' },
  favoriteActive: { color: '#FE6D8E' },
  info: { paddingHorizontal: 8, paddingVertical: 10 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 6, textAlign: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  star: { color: '#FFD700', fontSize: 15, marginRight: 4 },
  ratingValue: { fontSize: 15, color: '#444' },
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
  recordingActive: { backgroundColor: '#FE6D8E' },
  recordIcon: { fontSize: 16, color: '#fff' },
  audioButtons: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
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
  syncText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },
  synced: { backgroundColor: '#4caf50' },
  pending: { backgroundColor: '#fbc02d' },
});

export default MovieCard;
