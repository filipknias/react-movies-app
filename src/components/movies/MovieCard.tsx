import { Button, Card, Icon, Image, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

type MovieCardProps = {
  posterPath: string;
  title: string;
  votesAverage: number;
  overview: string;
  id: number;
}

export default function MovieCard({ 
  posterPath, 
  title, 
  votesAverage, 
  overview, 
  id,
}: MovieCardProps) {
  return (
    <Card.Root className="overflow-hidden">
      <Image 
        src={`https://image.tmdb.org/t/p/w200/${posterPath}`} 
        alt={title}
        objectFit="contain"
        className="w-full"
      />
      <Card.Body>
        <div className="flex items-start justify-between">
          <Card.Title mb={2}>{title}</Card.Title>
          <div className="flex items-center gap-1">
            <Icon fontSize="sm" color="yellow.500">
              <FaStar />
            </Icon>
            <Text fontWeight="medium">{votesAverage.toFixed(1)}</Text>
          </div>
        </div>
        <Card.Description mb={6}>
          {overview}
        </Card.Description>
        <Card.Footer mt="auto" p={0}>
          <Link to={`/movies/${id}`} className="w-full">
            <Button mt="auto" bg="teal.500" w="100%">Details</Button>
          </Link>
        </Card.Footer>
      </Card.Body>
    </Card.Root>
  )
}
