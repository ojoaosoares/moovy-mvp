import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { MovieDto } from '../types';
import FavoriteButton from './FavoriteButton';
import AudioControls from './AudioControls';

interface MovieCardProps {
  movie: MovieDto;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(movie.isFavorite || false);

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

        <FavoriteButton isFavorite={isFavorite} onToggle={handleToggleFavorite} />
      </View>

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.Title || 'No Title'}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingValue}>{movie.imdbRating || '-'}</Text>
        </View>

        <AudioControls movieId={movie.imdbID} />
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
    height: '70%',
    backgroundColor: '#eee',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  poster: { width: '100%', height: '100%' },
  info: { paddingHorizontal: 8, paddingVertical: 10 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 6, textAlign: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  star: { color: '#FFD700', fontSize: 15, marginRight: 4 },
  ratingValue: { fontSize: 15, color: '#444' },
});

export default MovieCard;
