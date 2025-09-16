import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { MovieDto } from '../types';
import ShowMovies from '../components/ShowMovies';

const LibraryScreen: React.FC = () => {
  const [movies, setMovies] = useState<MovieDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        // ⚠️ Replace localhost with your PC IP (e.g., http://192.168.1.10:4000)
        const response = await fetch('http://10.0.2.2:4000/favorites'); 
        const data = await response.json();
        const favoritesWithFlag = (data.favorites || []).map(
          (movie: Partial<MovieDto>) => ({
            ...movie,
            isFavorite: true,
          })
        );
        setMovies(favoritesWithFlag);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  return (
    <View style={styles.container}>

      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <Text style={styles.title}>My Library</Text>
      </View>

      {loading && <ActivityIndicator size="large" />}
      {!loading && movies.length > 0 && <ShowMovies movies={movies} />}
      {!loading && movies.length === 0 && (
        <Text style={styles.emptyText}>It looks like there are no movies in your library! Go to your web application and add some!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 16,
    textAlign: 'left',
    fontFamily: 'Arial',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',  
  },
});

export default LibraryScreen;
