import { useSearchParams } from "react-router";

export default function useApiQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getApiQuery = (key: string) => {
    return searchParams.get(key);
  };

  const setApiQuery = (query: { key: string; value: string; }) => {
    const { key, value } = query;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const clearApiQuery = () => {
    setSearchParams({});
  };

  return { getApiQuery, setApiQuery, clearApiQuery };
}
