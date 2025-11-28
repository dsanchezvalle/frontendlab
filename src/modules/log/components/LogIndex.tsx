"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar";
import { CardGrid } from "@/components/shared/CardGrid";
import { PreviewCard } from "@/components/shared/PreviewCard";

import { useArticles } from "@/hooks/useArticles";
import { searchArticles } from "@/utils/searchArticles";
import { getLocalizedContent, formatLocalizedDate } from "@/utils/localization";

import type { Locale, IArticle } from "@/lib/db/types/article";
import type { LogArticle } from "@/modules/log/types";

export function LogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useParams();
  const currentLocale = locale as Locale;

  const { articles, isLoading } = useArticles(currentLocale);

  // LogIndex should operate on LogArticle DTOs
  const [filteredArticles, setFilteredArticles] = useState<LogArticle[]>([]);

  useEffect(() => {
    // searchArticles is still typed for IArticle[]; at runtime we get LogArticle DTOs.
    // Cast through unknown to satisfy both TS and lint.
    const next = searchArticles(
      articles as IArticle[],
      searchQuery,
      currentLocale
    ) as unknown as LogArticle[];

    setFilteredArticles(next);
  }, [searchQuery, articles, currentLocale]);

  return (
    <>
      <StickyTopSearchBar title="The Log" onSearchChange={setSearchQuery} />

      <CardGrid isLoading={isLoading}>
        {filteredArticles.map((article) => (
          <PreviewCard
            key={article._id}
            title={getLocalizedContent(article.title, currentLocale)}
            description={getLocalizedContent(
              article.description,
              currentLocale
            )}
            href={`/${currentLocale}/log/${getLocalizedContent(
              article.slug,
              currentLocale
            )}`}
            titleAs="h2"
            date={formatLocalizedDate(
              article.publishedAt || article.createdAt || undefined,
              currentLocale
            )}
            tags={article.tags?.map((tag) =>
              getLocalizedContent(tag.label, currentLocale)
            )}
          />
        ))}
      </CardGrid>
    </>
  );
}
