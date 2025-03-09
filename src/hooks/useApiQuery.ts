import { useSearchParams } from "react-router";

export default function useApiQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getApiQuery = (key: string) => {
    return searchParams.get(key);
  };

  const setApiQuery = (query: Record<string, string|undefined>) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(query).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  return { getApiQuery, setApiQuery };
}
