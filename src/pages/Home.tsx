import { MoviesListFilters, getMoviesList } from "@/api/moviesApi";
import ErrorBox from "@/components/common/ErrorBox";
import Pagination from "@/components/common/Pagination";
import MovieCard from "@/components/movies/MovieCard";
import { 
  Heading, 
  Highlight, 
  SimpleGrid, 
  Skeleton, 
  Text, 
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import FiltersGroup from "@/components/movies/FiltersGroup";
import { useMemo } from "react";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const language = searchParams.get('with_original_language');
  const genre = searchParams.get('with_genres');
  const sortBy = searchParams.get('sort_by');

  const filtersObj = useMemo(() => {
    const filters: MoviesListFilters = {};
    if (language) {
      filters.with_original_language = language;
      filters.language = language;
    }
    if (genre) {
      filters.with_genres = genre;
    }
    if (sortBy) {
      filters.sort_by = sortBy;
    }
    return filters;
  }, [language, genre, sortBy]);

  const { data, isLoading, refetch, isRefetching } = useQuery({ 
    queryKey: ['movies', page, language, genre, sortBy], 
    queryFn: () => getMoviesList(page ? parseInt(page) : 1, filtersObj),
  });

  const hasData = data && "results" in data;
  const hasApiError = data && "status_code" in data;

  const handlePageChange = (nextPage: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", nextPage);
    setSearchParams(newParams);
  };
  
  return (
    <div>
      <Heading 
        size="6xl" 
        textAlign="center" 
        fontWeight="bold"
        mb={4}
      >
        <Highlight query={["Movies"]} styles={{ px: "2", bg: "teal.300" }}>
          Discover Movies Database
        </Highlight>
      </Heading>
      <Text 
        textAlign="center"
        fontWeight="medium"
        textStyle="lg"
        mb={12}
      >
        Search, filter & sort movies from MoviesDB!
      </Text>
      <FiltersGroup />
      {hasApiError && (
        <ErrorBox 
          errorMessage={data.status_message} 
          retryFunction={refetch} 
          retryLoading={isRefetching}
        />
      )}
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap="6" mb={24}>
        {isLoading && (
          <>
            <Skeleton height="500px" />
            <Skeleton height="500px" />
            <Skeleton height="500px" />
            <Skeleton height="500px" />
          </>
        )}
        {hasData && data.results.map((movie) => (
          <MovieCard 
            key={movie.id}
            id={movie.id}
            posterPath={movie.poster_path}
            title={movie.title}
            votesAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </SimpleGrid>
      {hasData && (
        <Pagination
          count={data.total_results}
          page={page ? parseInt(page) : 1}
          pageSize={data.results.length}
          onPageChange={(nextPage) => handlePageChange(nextPage.toString())}
        />
      )}
    </div>
  )
}
