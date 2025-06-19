'use client'

import { Calendar, Facebook, Linkedin, Twitter, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ArticleHeaderProps = {
  title: string
  tags: string[]
  date: string
  author: string
  readingTime: string
}

export default function ArticleHeader({
  title,
  tags,
  date,
  author,
  readingTime,
}: ArticleHeaderProps) {
  return (
    <div className="mb-12">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="font-sans">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 font-sans">{title}</h1>

      {/* Meta Info */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="font-sans">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-sans">By {author}</span>
        </div>
      </div>

      {/* Footer Row */}
      <div className="border-t border-b py-4 flex justify-between items-center">
        <div className="text-sm font-sans">{readingTime}</div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Share on Twitter</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Share on Facebook</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Share on LinkedIn</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
