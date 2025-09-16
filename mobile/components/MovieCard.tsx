import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MovieDto } from '../types';

interface MovieCardProps {
  movie: MovieDto;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

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
        <TouchableOpacity
          style={styles.favoriteBtn}
          onPress={handleToggleFavorite}
        >
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>
            ★
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>
          {movie.Title || 'No Title'}
        </Text>
        <View style={styles.rating}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.ratingValue}>{movie.imdbRating || '-'}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: '80%',
    backgroundColor: '#fff',
    overflow: 'hidden',
    
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
});

export default MovieCard;
