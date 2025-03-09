import { getLanguages, getGenres } from "@/api/moviesApi";
import { SearchParams } from "@/enums/searchParams";
import useApiQuery from "@/hooks/useApiQuery";
import { 
  SelectContent, 
  SelectItem, 
  SelectLabel, 
  SelectRoot, 
  SelectTrigger, 
  SelectValueText,
  createListCollection,
  Flex,
  Button
} from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { IoRefresh } from "react-icons/io5";

export default function FiltersGroup() {
  const { getApiQuery, setApiQuery, clearApiQuery } = useApiQuery();
  const initialLanguage = getApiQuery(SearchParams.WITH_ORIGINAL_LANGUAGE);
  const initialGenre = getApiQuery(SearchParams.WITH_GENRES);
  const initialSort = getApiQuery(SearchParams.SORT_BY);

  const [languagesQuery, genresQuery] = useQueries({ 
    queries: [
      { queryKey: ['languages'], queryFn: getLanguages },
      { queryKey: ['genres'], queryFn: getGenres },
    ],
  });

  const hasLanguagesData = languagesQuery.data && !("status_code" in languagesQuery.data);
  const hasGenresData = genresQuery.data && !("status_code" in genresQuery.data);

  const languages = useMemo(() => {
    return createListCollection({
      items: languagesQuery.data && !("status_code" in languagesQuery.data) ? languagesQuery.data : [],
      itemToString: (item) => item.english_name,
      itemToValue: (item) => item.iso_639_1,
    })
  }, [languagesQuery.data]);

  const genres = useMemo(() => {
    return createListCollection({
      items: genresQuery.data && !("status_code" in genresQuery.data) ? genresQuery.data.genres : [],
      itemToString: (item) => item.name,
      itemToValue: (item) => item.id.toString(),
    })
  }, [genresQuery.data]);

  const sortBy = createListCollection({
    items: [
      { label: "Original Title (A-Z)", value: "original_title.asc" },
      { label: "Original Title (Z-A)", value: "original_title.desc" },
      { label: "Popularity (Low to High)", value: "popularity.asc" },
      { label: "Popularity (High to Low)", value: "popularity.desc" },
      { label: "Revenue (Low to High)", value: "revenue.asc" },
      { label: "Revenue (High to Low)", value: "revenue.desc" },
      { label: "Release Date (Oldest First)", value: "primary_release_date.asc" },
      { label: "Release Date (Newest First)", value: "primary_release_date.desc" },
      { label: "Title (A-Z)", value: "title.asc" },
      { label: "Title (Z-A)", value: "title.desc" },
      { label: "Vote Average (Low to High)", value: "vote_average.asc" },
      { label: "Vote Average (High to Low)", value: "vote_average.desc" },
      { label: "Vote Count (Low to High)", value: "vote_count.asc" },
      { label: "Vote Count (High to Low)", value: "vote_count.desc" },
    ],
  });

  return (
    <>
      <Flex 
        direction={{ mdDown: "column", lg: "row" }} 
        justify="center" 
        align={{ mdDown: "center", md: "flex-end" }} 
        gap={8}
        mb={8}
      >
          {hasLanguagesData && (
            <SelectRoot  
              collection={languages} 
              size="sm" 
              width="200px" 
              position="relative"
              onValueChange={(e) => setApiQuery({ key: SearchParams.WITH_ORIGINAL_LANGUAGE, value: e.value[0] })}
              highlightedValue={initialLanguage || null}
            >
              <SelectLabel>Language</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="absolute top-full w-full">
                {languages.items.map((language) => (
                  <SelectItem item={language} key={language.iso_639_1}>
                    {language.english_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
          {hasGenresData && (
            <SelectRoot  
              collection={genres} 
              size="sm" 
              width="200px" 
              position="relative"
              onValueChange={(e) => setApiQuery({ key: SearchParams.WITH_GENRES, value: e.value[0] })}
              highlightedValue={initialGenre || null}
            >
              <SelectLabel>Genre</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent className="absolute top-full w-full">
                {genres.items.map((genre) => (
                  <SelectItem item={genre} key={genre.id}>
                    {genre.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          )}
          <SelectRoot  
              collection={sortBy} 
              size="sm" 
              width="200px" 
              position="relative"
              onValueChange={(e) => setApiQuery({ key: SearchParams.SORT_BY, value: e.value[0] })}
              highlightedValue={initialSort || null}
            >
              <SelectLabel>Sort By</SelectLabel>
              <SelectTrigger>
                <SelectValueText placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="absolute top-full w-full">
                {sortBy.items.map((sortOption) => (
                  <SelectItem item={sortOption} key={sortOption.value}>
                    {sortOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
          </SelectRoot>
          <Button 
            bg="teal.500" 
            w={{ mdDown: "200px", lg: "auto" }}
            onClick={clearApiQuery}
          >
            <IoRefresh /> Reset
          </Button>
      </Flex>
    </>
  )
}
