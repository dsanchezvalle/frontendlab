import { routing } from "@/i18n/routing";
import { getLocalizedContent } from "@/utils/localization";
import type { LogArticle } from "@/modules/log/types";

type Locale = (typeof routing)["locales"][number];

export function searchArticles(
  articles: LogArticle[],
  query: string,
  locale: Locale
): LogArticle[] {
  if (!query.trim()) return articles;

  const searchTerm = query.toLowerCase();

  return articles.filter((article) => {
    const title = getLocalizedContent(article.title, locale).toLowerCase();
    const description = getLocalizedContent(
      article.description,
      locale
    ).toLowerCase();
    const content = getLocalizedContent(article.content, locale).toLowerCase();

    const tagsText = (article.tags ?? [])
      .map((tag) => getLocalizedContent(tag.label, locale).toLowerCase())
      .join(" ");

    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      content.includes(searchTerm) ||
      tagsText.includes(searchTerm)
    );
  });
}
