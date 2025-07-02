'use client'

import { useCallback, useState } from "react"
import { createSlug } from "@/lib/slug"
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar"
import { CardGrid } from "@/components/shared/CardGrid"
import { mockLogPosts } from "./mocks"
import type { LogPost } from "@/types"
import { useSearch, useDebouncedValue } from "@/hooks"
import { PreviewCard } from "@/components/shared/PreviewCard"
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
  
  // When using API:
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
          <PreviewCard
          key={post.id}
          title={post.title}
          description={post.description}
          tags={post.tags}
          date={post.date}
          readTime={post.readTime}
          href={`/log/${createSlug(post.id, post.title)}`}
          titleAs={"h2"}
          // imageUrl={post.imageUrl} // optional
        />
        ))}
      </CardGrid>
    </>
  )
}
