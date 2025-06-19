'use client'

import ArticleHeader from "@/components/sections/log/ArticleDetail/ArticleHeader"
import ArticleBody from "@/components/sections/log/ArticleDetail/ArticleBody"
import AuthorCard from "@/components/sections/log/ArticleDetail/AuthorCard"
import RelatedArticles from "@/components/sections/log/ArticleDetail/RelatedArticles"
import Comments from "@/components/sections/log/ArticleDetail/Comments"
import { mockArticle, mockAuthor, mockRelatedArticles, mockComments, mockHandlers, } from "@/components/sections/log/ArticleDetail/mocks"
import BackButton from "@/components/shared/BackButton"

export default function ArticleDetailPage() {

  return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <div className="mb-8">
          <BackButton href="/log" label="Back to The Log"   />
        </div>

        {/* Article Header */}
        <ArticleHeader
          title={mockArticle.title}
          tags={mockArticle.tags}
          date={mockArticle.date}
          author={mockArticle.author}
          readingTime={mockArticle.readingTime}
        />

        {/* Article Content */}
        <ArticleBody/>

        {/* Author Bio */}
        <AuthorCard
          initials={mockAuthor.initials}
          name={mockAuthor.name}
          bio={mockAuthor.bio}
          onFollow={mockHandlers.onFollow}
          onViewAll={mockHandlers.onViewAll}
        />

        {/* Related Articles */}
        <RelatedArticles articles={mockRelatedArticles} />

        {/* Comments Section */}
        <Comments comments={mockComments} onSubmit={mockHandlers.onCommentSubmit} />

      </div>
  )
}
