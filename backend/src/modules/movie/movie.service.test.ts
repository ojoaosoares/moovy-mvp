import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpService: Partial<HttpService>;

  beforeEach(() => {
    httpService = {
      get: jest.fn().mockReturnValue(
        of({
          data: {
            Response: 'True',
            Search: [
              {
                imdbID: 'tt0848228',
                Title: 'The Avengers',
                Year: '2012',
                Type: 'movie',
                Poster: 'https://test.poster',
              },
            ],
          },
        }),
      ),
    };

    service = new MovieService(httpService as HttpService);
  });

  it('MovieService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchMovies', () => {
    it('should return a list of movies for a valid query', async () => {
      const movies = await service.searchMovies('Inception');
      expect(movies).toBeInstanceOf(Array);
      expect(movies[0]).toHaveProperty('imdbID');
      expect(movies[0]).toHaveProperty('title');
    });
  });
});
