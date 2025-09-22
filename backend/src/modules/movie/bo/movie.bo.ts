export class BoSearch {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: string;
}

export interface BoMovie {
  imdbID: string;
  Title: string;
  Poster?: string;
  imdbRating?: string;
  Response: string;
}
