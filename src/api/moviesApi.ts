import { MoviesListResponse, MoviesListError } from "@/types/api";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getMoviesList(): Promise<MoviesListResponse|MoviesListError> {
  const response = await fetch(`${BASE_URL}/discover/movie`, {
    headers: {
      "Authorization": `Berer ${import.meta.env.VITE_MOVIEDB_API_KEY}`,
    },
  });
  return response.json();
};