import { useState, useEffect } from "react";
import type { IArticle, Locale } from "@/lib/db/types/article";

export function useArticles(locale: Locale) {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Locale is expected to be handled in the future here with const res = await fetch(`/api/articles?locale=${locale}`);
        const res = await fetch("/api/articles");
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch articles")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [locale]);

  return { articles, isLoading, error };
}

