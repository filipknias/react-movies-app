import { MovieDetails } from "@/types/models";
import { formatDate } from "@/utilities/formatDate";
import { 
  GridItem, 
  Heading, 
  Image, 
  SimpleGrid, 
  Text, 
  Stat, 
  HStack, 
  Icon, 
  Badge 
} from "@chakra-ui/react";
import { MdHideImage } from "react-icons/md";

type MovieDetailsViewProps = {
  movieDetails: MovieDetails;
};

export default function MovieDetailsView({ movieDetails }: MovieDetailsViewProps) {
  return (
    <SimpleGrid columns={{ md: 2 }} gap={16}>
        <GridItem>
          <Image 
            src={`https://image.tmdb.org/t/p/w200/${movieDetails.poster_path}`} 
            alt={movieDetails.title}
            objectFit="cover"
            className="w-full rounded-md"
            height={850}
          />
        </GridItem>
        <GridItem>
          <Heading 
            size="6xl" 
            fontWeight="bold"
            mb={8}
          >
            {movieDetails.title}
          </Heading>
          <Text 
            mb={4} 
            fontWeight="semibold" 
            fontSize="xl"
          >
            Description
          </Text>
          <Text maxW="xl" mb={12}>{movieDetails.overview}</Text>
          <Text 
            mb={4} 
            fontWeight="semibold" 
            fontSize="xl"
          >
            Genres
          </Text>
          <HStack mb={12}>
            {movieDetails.genres.map((genre) => (
              <Badge key={genre.id} size="lg">{genre.name}</Badge>
            ))}
          </HStack>
          <Text 
            mb={4} 
            fontWeight="semibold" 
            fontSize="xl"
          >
            Languages Spoken
          </Text>
          <HStack mb={12}>
            {movieDetails.spoken_languages.map((language) => (
              <Badge key={language.iso_639_1} size="lg">{language.name}</Badge>
            ))}
          </HStack>
          <Text 
            mb={4} 
            fontWeight="semibold" 
            fontSize="xl"
          >
            Movie Statistics
          </Text>
          <SimpleGrid columns={{ md: 2, lg: 3 }} gap={8} mb={12}>
            <GridItem>
              <Stat.Root>
                <Stat.Label>Votes Average</Stat.Label>
                <Stat.ValueText>
                  {movieDetails.vote_average.toFixed(2)}
                </Stat.ValueText>
              </Stat.Root>
            </GridItem>
            <GridItem>
              <Stat.Root>
                <Stat.Label>Votes Count</Stat.Label>
                <Stat.ValueText>
                  {movieDetails.vote_count}
                </Stat.ValueText>
              </Stat.Root>
            </GridItem>
            <GridItem>
              <Stat.Root>
                <Stat.Label>Release Date</Stat.Label>
                <Stat.ValueText>
                  {formatDate(movieDetails.release_date)}
                </Stat.ValueText>
              </Stat.Root>
            </GridItem>
          </SimpleGrid>
          <Text 
            mb={4} 
            fontWeight="semibold" 
            fontSize="xl"
          >
            Production Companies
          </Text>
          <SimpleGrid columns={{ md: 2, lg: 3 }} gap={8}>
            {movieDetails.production_companies.map((productionCompany) => (
              <GridItem key={productionCompany.id}>
                {productionCompany.logo_path ? (
                  <Image 
                    src={`https://image.tmdb.org/t/p/w200/${productionCompany.logo_path}`} 
                    alt={productionCompany.name}
                    objectFit="contain"
                    height={100}
                    width={200}
                    mx="auto"
                  />
                ) : (
                  <div className="h-full min-h-24 bg-gray-300 rounded-md flex flex-col items-center justify-center">
                    <Icon color="gray.400" fontSize="4xl" mb={4}>
                      <MdHideImage />
                    </Icon>
                    <Text 
                      color="gray.600" 
                      fontWeight="semibold"
                      fontSize="sm"
                    >
                      {productionCompany.name}
                    </Text>
                  </div>
                )}
              </GridItem>
            ))}
          </SimpleGrid>
        </GridItem>
      </SimpleGrid>
  )
}
