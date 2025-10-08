import { MovieDto, HasFavoriteDTO } from '../../types';

export class SearchService {
  async searchMovies(query: string): Promise<MovieDto[]> {
    const response = await fetch(
      `http://localhost:4000/movies/search?q=${query}`
    );
    const movies: MovieDto[] = await response.json();
    return movies;
  }

  async checkFavorite(movie: MovieDto): Promise<HasFavoriteDTO> {
    try {
      const res = await fetch(
        `http://localhost:4000/favorites/${movie.imdbID}`
      );
      const favData: HasFavoriteDTO = await res.json();

      if (favData.hasFavorite) {
        return { favorite: favData.favorite, hasFavorite: true };
      }

      return { favorite: movie, hasFavorite: false };
    } catch {
      return { favorite: movie, hasFavorite: false };
    }
  }

  async searchMoviesWithFavorites(query: string): Promise<HasFavoriteDTO[]> {
    const movies = await this.searchMovies(query);
    const moviesWithFavs = await Promise.all(
      movies.map((movie) => this.checkFavorite(movie))
    );
    return moviesWithFavs;
  }
}
