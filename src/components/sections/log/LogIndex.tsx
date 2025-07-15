"use client";

import { useCallback, useState } from "react";
import { createSlug } from "@/lib/slug";
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar";
import { CardGrid } from "@/components/shared/CardGrid";
import { mockArticles } from "./mocks";
import type { LogArticle } from "@/types";
import { useSearch, useDebouncedValue } from "@/hooks";
import { PreviewCard } from "@/components/shared/PreviewCard";
// import { useDebouncedFetch } from "@/hooks/useDebouncedFetch" // Ready to swap later

export function LogIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filterFn = useCallback(
    (article: LogArticle, query: string) =>
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.description.toLowerCase().includes(query.toLowerCase()) ||
      article.tags?.some((tag: string) =>
        tag.toLowerCase().includes(query.toLowerCase())
      ),
    []
  );
  // Using mock data for now, replace with actual data fetching logic later
  const { results: filteredArticles, isLoading } = useSearch({
    data: mockArticles,
    query: debouncedSearchQuery,
    filterFn: filterFn,
  });

  // When using API:
  // const { results: filteredArticles, isLoading } = useDebouncedFetch(searchQuery, '/api/articles')

  return (
    <>
      {/* Sticky Search Header */}
      <StickyTopSearchBar title="The Log" onSearchChange={setSearchQuery} />

      {/* Log Articles Grid */}
      <CardGrid isLoading={isLoading}>
        {filteredArticles.map((article) => (
          <PreviewCard
            key={article.id}
            title={article.title}
            description={article.description}
            tags={article.tags}
            date={article.date}
            readTime={article.readTime}
            href={`/log/${createSlug(article.id, article.title)}`}
            titleAs={"h2"}
            // imageUrl={article.imageUrl} // optional
          />
        ))}
      </CardGrid>
    </>
  );
}
