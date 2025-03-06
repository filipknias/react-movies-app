import { Movie } from "./models";

export type MoviesListResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type MoviesListError = {
  status_code: number;
  status_message: string;
  success: boolean;
}