import { notFound } from "next/navigation";
import type { Locale } from "@/lib/db/types/article";
import { getArticleBySlug } from "@/modules/log/services/articles";
import {
  ArticleHeader,
  ArticleBody,
  AuthorCard,
  RelatedArticles,
  Comments,
  mockRelatedArticles,
  mockComments,
} from "@/components/sections/log";
import BackButton from "@/components/shared/BackButton";
import { getLocalizedContent } from "@/utils/localization";
import type { LogArticle } from "@/modules/log/types";

type PageParams = {
  locale: Locale;
  slug: string;
};

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  // Next's generated types expect params to be a Promise, so we await it here
  const { locale, slug } = await params;

  const article = await getArticleBySlug(locale, slug);

  if (!article) {
    notFound();
  }

  const logArticle = article as LogArticle;

  const articleTitle = getLocalizedContent(logArticle.title, locale);
  const articleDate = logArticle.date;
  const articleAuthor = logArticle.author.name;
  const articleTags = logArticle.tags.map((tag) =>
    getLocalizedContent(tag.label, locale)
  );
  const readingTime = logArticle.readTime;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Back Button */}
      <div className="mb-8">
        <BackButton href={`/${locale}/log`} label="Back to The Log" />
      </div>

      {/* Article Header */}
      <ArticleHeader
        title={articleTitle}
        tags={articleTags}
        date={articleDate}
        author={articleAuthor}
        readingTime={readingTime}
      />

      {/* Article Content */}
      <ArticleBody />

      {/* Author Bio */}
      <AuthorCard
        initials={logArticle.author.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
        name={logArticle.author.name}
        bio={getLocalizedContent(logArticle.author.bio, locale)}
      />

      {/* Related Articles (still using mocks as preview data) */}
      <RelatedArticles articles={mockRelatedArticles} />

      {/* Comments (no handler from server, just preview data) */}
      <Comments comments={mockComments} />
    </div>
  );
}
