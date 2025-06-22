'use client'

import { useCallback, useState } from "react"
import { Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createSlug } from "@/lib/slug"
import Link from "next/link"
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar"
import { CardGrid } from "@/components/shared/CardGrid"
import { mockLogPosts } from "./mocks"
import type { LogPost } from "@/types"
import { useSearch, useDebouncedValue } from "@/hooks"
// import { useDebouncedFetch } from "@/hooks/useDebouncedFetch" // Ready to swap later

export function LogIndex() {
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filterFn = useCallback(
    (post: LogPost, query: string) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query.toLowerCase())),
    []
  )
  // Using mock data for now, replace with actual data fetching logic later
  const { results: filteredPosts, isLoading } = useSearch({
    data: mockLogPosts,
    query: debouncedSearchQuery,
    filterFn: filterFn
  })
  
  // When using real API:
  // const { results: filteredPosts, isLoading } = useDebouncedFetch(searchQuery, '/api/posts')

  return (
    <>
      {/* Sticky Search Header */}
      <StickyTopSearchBar
        title="The Log"
        onSearchChange={setSearchQuery}
      />

      {/* Log Posts Grid */}
      <CardGrid isLoading={isLoading} >
        {filteredPosts.map((post) => (
          <Link key={post.id} href={`/log/${createSlug(post.id, post.title)}`}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                  <span>•</span>
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs font-medium">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </CardGrid>
    </>
  )
}
