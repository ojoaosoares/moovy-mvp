import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLibrary } from '../hooks/useLibrary';
import ShowMovies from '../components/ShowMovies';

const LibraryScreen: React.FC = () => {
  const { movies, loading, error } = useLibrary();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: 20, paddingLeft: 20 }}>
        <Text style={styles.title}>My Library</Text>
      </View>

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.emptyText}>{error}</Text>}
      {!loading && movies.length > 0 && !error && <ShowMovies movies={movies} />}
      {!loading && movies.length === 0 && !error && (
        <Text style={styles.emptyText}>
          It looks like there are no movies in your library! Go to your web application and add
          some!
        </Text>
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
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginVertical: 20,
  },
});

export default LibraryScreen;
