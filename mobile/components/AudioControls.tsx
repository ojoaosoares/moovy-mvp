import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAudioControl } from '../hooks/useAudioControl';

interface AudioControlsProps {
  movieId: string;
}

const AudioControls: React.FC<AudioControlsProps> = ({ movieId }) => {
  const { isRecording, audioUri, needsSync, handleRecordAudio, playAudio, deleteAudio } =
    useAudioControl(movieId);

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
