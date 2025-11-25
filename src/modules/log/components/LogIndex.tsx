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

export function LogIndex() {
  const [searchQuery, setSearchQuery] = useState("");
  const { locale } = useParams();
  const currentLocale = locale as Locale;

  const { articles, isLoading } = useArticles(currentLocale);
  const [filteredArticles, setFilteredArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    setFilteredArticles(searchArticles(articles, searchQuery, currentLocale));
  }, [searchQuery, articles, currentLocale]);

  return (
    <>
      <StickyTopSearchBar title="The Log" onSearchChange={setSearchQuery} />
      <CardGrid isLoading={isLoading}>
        {filteredArticles.map((article) => (
          <PreviewCard
            key={article.id.toString()}
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
            //locale={currentLocale}
            date={
              formatLocalizedDate(
                //new Date("December 17, 1995 03:24:00") ||
                article.publishedAt || article.createdAt || undefined,
                currentLocale
              )
              //new Date("December 17, 1995 03:24:00")
              //article.publishedAt ? new Date(article.publishedAt) : undefined
            }
            tags={article.tags?.map((tag) =>
              getLocalizedContent(tag.label, currentLocale)
            )}
          />
        ))}
      </CardGrid>
    </>
  );
}

