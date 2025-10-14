import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { HasFavoriteDTO } from '../types';
import MovieCard from './MovieCard';

interface ShowMoviesProps {
  movies: HasFavoriteDTO[];
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.8;
const CARD_MARGIN = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_MARGIN;

const PADDING_HORIZONTAL = (SCREEN_WIDTH - CARD_WIDTH) / 2 - CARD_MARGIN / 2;

const ShowMovies: React.FC<ShowMoviesProps> = ({ movies }) => {
  const [displayedMovies, setDisplayedMovies] = useState<HasFavoriteDTO[]>([]);

  useEffect(() => {
    let index = 0;
    setDisplayedMovies([]);

    const interval = setInterval(() => {
      if (index < movies.length) {
        const movie = movies[index];
        if (movie) {
          setDisplayedMovies((prev) => [...prev, movie]);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      snapToInterval={SNAP_INTERVAL}
      snapToAlignment="start"
      decelerationRate="fast"
      disableIntervalMomentum={true}
    >
      {displayedMovies.map(
        (movie) =>
          movie && (
            <View key={movie.favorite.imdbID} style={styles.cardWrapper}>
              <MovieCard movie={movie} />
            </View>
          ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: PADDING_HORIZONTAL,
    alignItems: 'center',
  },
  cardWrapper: {
    marginHorizontal: CARD_MARGIN / 2,
  },
});

export default ShowMovies;
