import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

interface AudioControlsProps {
  movieId: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({ movieId }) => {
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
        name: `audio_${movieId}.mp3`,
        type: 'audio/mp3',
      } as any);

      await fetch(`http://10.0.2.2:4000/favorites/audio/${movieId}`, {
        method: 'POST',
        body: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Audio synced successfully');
      setNeedsSync(false);
    } catch (err) {
      console.log('Error when syncing audio', err);
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
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
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

  return (
    <View>
      {audioUri && (
        <View style={[styles.syncBar, needsSync ? styles.pending : styles.synced]}>
          <Text style={styles.syncText}>{needsSync ? 'pending' : 'synced'}</Text>
        </View>
      )}

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
  );
};

const styles = StyleSheet.create({
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
    marginTop: 6,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  syncText: { fontSize: 12, color: '#fff', fontWeight: 'bold' },
  synced: { backgroundColor: '#4caf50' },
  pending: { backgroundColor: '#fbc02d' },
});

export default AudioControls;
