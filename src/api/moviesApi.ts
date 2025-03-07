import { MoviesListResponse, MoviesListError, GenresListResponse } from "@/types/api";
import { MovieDetails, SpokenLanguage } from "@/types/models";

const BASE_URL = "https://api.themoviedb.org/3";

export type MoviesListFilters = {
  with_original_language?: string;
  language?: string;
  with_genres?: string;
  sort_by?: string;
};

export async function getMoviesList(page: number = 1, filters: MoviesListFilters  ): Promise<MoviesListResponse|MoviesListError> {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`${BASE_URL}/discover/movie?page=${page}&${queryParams}`, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
    },
  });
  return response.json();
};

export async function getMovieDetails(id: string): Promise<MovieDetails|MoviesListError> {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}`, {
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
      },
    });
    return response.json();
  } catch (err) {
    throw Error("message");
  }
}

export async function getLanguages(): Promise<SpokenLanguage[]|MoviesListError> {
  const response = await fetch(`${BASE_URL}/configuration/languages`, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
    },
  });
  return response.json();
};

export async function getGenres(): Promise<GenresListResponse|MoviesListError> {
  const response = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
    },
  });
  return response.json();
}