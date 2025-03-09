import { useEffect, useRef } from "react";

export const usePageTitle = (title: string) => {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      document.title = defaultTitle.current;
    }
  }, []);
}