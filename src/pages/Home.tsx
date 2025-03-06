import { getMoviesList } from "@/api/moviesApi";
import ErrorBox from "@/components/common/ErrorBox";
import Pagination from "@/components/common/Pagination";
import MovieCard from "@/components/movies/MovieCard";
import { Heading, Highlight, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');

  const { data, isLoading, refetch, isRefetching } = useQuery({ 
    queryKey: ['movies', page], 
    queryFn: () => getMoviesList(page ? parseInt(page) : 1),
  });

  const hasData = data && "results" in data;
  const hasApiError = data && "status_code" in data;

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
        mb={20}
      >
        Search, filter & sort movies from MoviesDB!
      </Text>
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
          count={500 * data.results.length}
          page={page ? parseInt(page) : 1}
          pageSize={data.results.length}
          onPageChange={(nextPage) => setSearchParams({ page: nextPage.toString() })}
        />
      )}
    </div>
  )
}
