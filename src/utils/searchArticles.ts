import type { IArticle, Locale } from "@/lib/db/types/article";

export function searchArticles(
  articles: IArticle[],
  query: string,
  locale: Locale
): IArticle[] {
  if (!query.trim()) return articles;

  const searchTerm = query.toLowerCase();
  return articles.filter((article) => {
    return (
      article.title[locale]?.toLowerCase().includes(searchTerm) ||
      article.description?.[locale]?.toLowerCase().includes(searchTerm) ||
      article.content[locale]?.toLowerCase().includes(searchTerm)
    );
  });
}
