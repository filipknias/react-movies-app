import { MoviesListResponse, MoviesListError } from "@/types/api";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMoviesList(page: number = 1): Promise<MoviesListResponse|MoviesListError> {
  const response = await fetch(`${BASE_URL}/discover/movie?page=${page}`, {
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
    },
  });
  return response.json();
};