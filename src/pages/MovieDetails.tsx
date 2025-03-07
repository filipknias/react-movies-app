import { getMovieDetails } from "@/api/moviesApi";
import ErrorBox from "@/components/common/ErrorBox";
import MovieDetailsView from "@/components/movies/MovieDetailsView";
import { Button, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, refetch, isRefetching, error } = useQuery({ 
    queryKey: ['movie', id], 
    queryFn: () => getMovieDetails(id as string),
    enabled: id !== undefined,
  });

  const hasData = data && "title" in data;
  const hasApiError = data && "status_code" in data;

  return (
    <>
      {hasData && (
        <>
          <Button 
            onClick={() => navigate(-1)} 
            bg="teal.500" 
            mb={12}
          >
            Return to dashboard
          </Button>
          <MovieDetailsView movieDetails={data} />
        </>
      )}
      {hasApiError && (
        <ErrorBox 
          errorMessage={data.status_message} 
          retryFunction={refetch} 
          retryLoading={isRefetching}
        />
      )}
      {error && (
        <ErrorBox 
          errorMessage={error.message} 
          retryFunction={refetch} 
          retryLoading={isRefetching}
        />
      )}
      {isLoading && (
        <SimpleGrid columns={{ md: 2 }} gap={12}>
          <GridItem>
            <Skeleton height="750px" />
          </GridItem>
          <GridItem>
            <Skeleton height="70px" mb={12} />
            <Skeleton height="100px" mb={12} />
            <Skeleton height="50px" mb={12} />
            <Skeleton height="50px" mb={12} />
            <Skeleton height="100px" mb={12} />
            <Skeleton height="150px" />
          </GridItem>
        </SimpleGrid>
      )}
    </>
  )
}
