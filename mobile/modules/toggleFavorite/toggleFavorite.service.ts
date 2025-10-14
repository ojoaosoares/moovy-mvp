import { FavoriteDTO } from '../../types';

export class ToggleFavoriteService {
  private baseUrl = 'http://10.0.2.2:4000/favorites';

  async addFavorite(movie: FavoriteDTO): Promise<void> {
    const res = await fetch(this.baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    });

    if (!res.ok) {
      throw new Error('Failed to add favorite');
    }
  }

  async removeFavorite(imdbID: string): Promise<void> {
    const res = await fetch(`${this.baseUrl}/${imdbID}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error('Failed to remove favorite');
    }
  }
}
