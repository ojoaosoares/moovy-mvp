import { useState } from 'react';
import { FavoriteDTO } from '../types';
import { ToggleFavoriteService } from '../modules/toggleFavorite/toggleFavorite.service';

const toggleFavoriteService = new ToggleFavoriteService();

export function useSetFavorite(movie: FavoriteDTO, initialFavorite: boolean) {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);

  const toggleFavorite = async () => {
    const newValue = !isFavorite;
    setIsFavorite(newValue);

    try {
      if (newValue) {
        await toggleFavoriteService.addFavorite(movie);
      } else {
        await toggleFavoriteService.removeFavorite(movie.imdbID);
      }
    } catch (err) {
      console.error(err);
      setIsFavorite((prev) => !prev);
    }
  };

  return { isFavorite, toggleFavorite };
}
