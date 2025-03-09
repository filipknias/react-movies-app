import { useSearchParams } from "react-router";

export default function useApiQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getApiQuery = (key: string) => {
    return searchParams.get(key);
  };

  const setApiQuery = (query: { key: string; value: string; }, replace?: boolean) => {
    const { key, value } = query;
    if (replace) {
      setSearchParams({ [key]: value });
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.set(key, value);
      setSearchParams(newParams);
    }
  };

  return { getApiQuery, setApiQuery };
}
