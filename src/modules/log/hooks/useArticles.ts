"use client";

import { useState, useEffect } from "react";
import { routing } from "@/i18n/routing";
import type { LogArticle } from "@/modules/log/types";

type Locale = (typeof routing)["locales"][number];

export function useArticles(locale: Locale) {
  const [articles, setArticles] = useState<LogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/articles?locale=${locale}`);
        if (!res.ok) throw new Error(res.statusText);
        const data: LogArticle[] = await res.json();
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
