import { getMoviesList } from "@/api/moviesApi";
import ErrorBox from "@/components/common/ErrorBox";
import MovieCard from "@/components/movies/MovieCard";
import { Heading, Highlight, SimpleGrid, Skeleton, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data, isLoading, refetch, isRefetching } = useQuery({ 
    queryKey: ['movies'], 
    queryFn: getMoviesList,
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
      <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap="6">
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
    </div>
  )
}
