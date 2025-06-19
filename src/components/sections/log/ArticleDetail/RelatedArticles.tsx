'use client'

import { Badge } from "@/components/ui/badge"

type RelatedArticle = {
  category: string
  title: string
  excerpt: string
  date: string
  readTime: string
}

type RelatedArticlesProps = {
  articles: RelatedArticle[]
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 font-sans">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Badge variant="secondary" className="mb-2 font-sans">
              {article.category}
            </Badge>
            <h3 className="font-medium mb-1 font-sans">{article.title}</h3>
            <p className="text-sm text-muted-foreground mb-2 font-serif">
              {article.excerpt}
            </p>
            <div className="text-xs text-muted-foreground font-sans">
              {article.date} • {article.readTime}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
