import { getMoviesList } from "@/api/moviesApi";
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
import FiltersGroup from "@/components/movies/FiltersGroup";
import { useMemo } from "react";
import { motion } from "motion/react";
import useApiQuery from "@/hooks/useApiQuery";
import { MoviesListFilters } from "@/types/api";

export default function Home() {
  const { getApiQuery, setApiQuery } = useApiQuery();
  const page = getApiQuery('page');
  const language = getApiQuery('with_original_language');
  const genre = getApiQuery('with_genres');
  const sortBy = getApiQuery('sort_by');

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

  const { data, isLoading, refetch, isRefetching, error } = useQuery({ 
    queryKey: ['movies', page, language, genre, sortBy], 
    queryFn: () => getMoviesList(page ? parseInt(page) : 1, filtersObj),
  });

  const hasData = data && "results" in data;
  const hasApiError = data && "status_code" in data;
  const isEmptyResults = hasData && data.results.length === 0;

  const handlePageChange = (nextPage: string) => {
    setApiQuery({ key: "page", value: nextPage });
    window.scrollTo(0, 0);
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
      {error && (
        <ErrorBox 
          errorMessage={error.message} 
          retryFunction={refetch} 
          retryLoading={isRefetching}
        />
      )}
      {hasApiError && (
        <ErrorBox 
          errorMessage={data.status_message} 
          retryFunction={refetch} 
          retryLoading={isRefetching}
        />
      )}
      {isEmptyResults && (
        <Text
          fontSize="xl"
          fontWeight="medium"
          textAlign="center" 
          color="gray.500"
          mt={12}
        >
          No movies found
        </Text>
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
          <motion.div 
            key={movie.id} 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 0.1, delay: 0.2 }}
          >
            <MovieCard 
              id={movie.id}
              posterPath={movie.poster_path}
              title={movie.title}
              votesAverage={movie.vote_average}
              overview={movie.overview}
            />
          </motion.div>
        ))}
      </SimpleGrid>
      {hasData && !isEmptyResults && (
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
