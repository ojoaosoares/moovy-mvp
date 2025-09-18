import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ isFavorite, onToggle }) => {
  return (
    <TouchableOpacity style={styles.favoriteBtn} onPress={onToggle}>
      <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteActive]}>★</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default FavoriteButton;
