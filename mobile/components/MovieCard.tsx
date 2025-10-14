import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { HasFavoriteDTO } from '../types';
import FavoriteButton from './FavoriteButton';
import AudioControls from './AudioControls';
import { useSetFavorite } from '../hooks/useToggleFavorite';

interface MovieCardProps {
  movie: HasFavoriteDTO;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;

//TODO add toast on mobile and on useSetFavorite
const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useSetFavorite(
    movie.favorite,
    movie.hasFavorite
  );

  return (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        {movie.favorite.poster ? (
          <Image source={{ uri: movie.favorite.poster }} style={styles.poster} />
        ) : (
          <Text>No Poster</Text>
        )}

        <FavoriteButton isFavorite={isFavorite} onToggle={toggleFavorite} />
      </View>

      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.title}>
          {movie.favorite.title || 'No Title'}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingValue}>{movie.favorite.imdbRating || '-'}</Text>
        </View>

        <AudioControls movieId={movie.favorite.imdbID} />
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
