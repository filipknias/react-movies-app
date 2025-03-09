import { getLanguages, getGenres } from "@/api/moviesApi";
import { SearchParams } from "@/enums/searchParams";
import useApiQuery from "@/hooks/useApiQuery";
import { Flex, createListCollection } from "@chakra-ui/react";
import {
  SelectContent, 
  SelectItem, 
  SelectLabel, 
  SelectRoot, 
  SelectTrigger, 
  SelectValueText,
} from "@/components/ui/select";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import { sortCollection } from "@/data/sortCollection";

export default function FiltersGroup() {
  const { getApiQuery, setApiQuery } = useApiQuery();
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
    items: sortCollection,
  });

  const handleSelectChange = (key: string, value: string|undefined) => {
    const newQueryObj: Record<string, string|undefined> = {
      [key]: value,
    };
    if (key !== SearchParams.SORT_BY) {
      newQueryObj[SearchParams.PAGE] = '1';
    }
    setApiQuery(newQueryObj);
  };

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
              onValueChange={(e) => handleSelectChange(SearchParams.WITH_ORIGINAL_LANGUAGE, e.value[0])}
              defaultValue={initialLanguage ? [initialLanguage] : undefined} 
            >
              <SelectLabel>Language</SelectLabel>
              <SelectTrigger clearable>
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
              onValueChange={(e) => handleSelectChange(SearchParams.WITH_GENRES, e.value[0])}
              defaultValue={initialGenre ? [initialGenre] : undefined} 
            >
              <SelectLabel>Genre</SelectLabel>
              <SelectTrigger clearable>
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
              onValueChange={(e) => handleSelectChange(SearchParams.SORT_BY, e.value[0])}
              defaultValue={initialSort ? [initialSort] : undefined} 
            >
              <SelectLabel>Sort By</SelectLabel>
              <SelectTrigger clearable>
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
      </Flex>
    </>
  )
}
