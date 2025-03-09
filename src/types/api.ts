import { Genre, Movie } from "./models";

export type MoviesListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type GenresListResponse = {
  genres: Genre[];
}

export type MoviesListError = {
  status_code: number;
  status_message: string;
  success: boolean;
}

export type MoviesListFilters = {
  with_original_language?: string;
  language?: string;
  with_genres?: string;
  sort_by?: string;
};