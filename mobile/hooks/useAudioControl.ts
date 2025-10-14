import { Audio } from 'expo-av';
import { useState, useEffect } from 'react';

export function useAudioControl(movieId: string) {
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

  return { isRecording, audioUri, needsSync, handleRecordAudio, playAudio, deleteAudio };
}
