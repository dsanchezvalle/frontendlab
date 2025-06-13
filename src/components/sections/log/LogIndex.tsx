'use client'

import * as React from "react"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchInput from "@/components/shared/SearchInput";
import { Button } from "@/components/ui/button"
import Link from "next/link"

type LogPost = {
  id: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
}

const logPosts: LogPost[] = [
  {
    id: "1",
    title: "Building Accessible React Components",
    description:
      "Learn how to create inclusive UI components that work for everyone, with practical examples and best practices for ARIA attributes and keyboard navigation.",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    tags: ["React", "Accessibility"],
  },
  {
    id: "2",
    title: "Modern CSS Grid Layouts",
    description:
      "Explore advanced CSS Grid techniques for creating responsive layouts that adapt to any screen size without media queries.",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    tags: ["CSS", "Layout"],
  },
  {
    id: "3",
    title: "TypeScript Tips for Better DX",
    description:
      "Discover TypeScript patterns and utilities that will improve your developer experience and code quality in large applications.",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    tags: ["TypeScript", "DX"],
  },
  {
    id: "4",
    title: "Optimizing React Performance",
    description:
      "Deep dive into React performance optimization techniques including memoization, code splitting, and bundle analysis.",
    date: "Dec 8, 2024",
    readTime: "12 min read",
    tags: ["React", "Performance"],
  },
  {
    id: "5",
    title: "CSS Custom Properties in Practice",
    description:
      "Master CSS custom properties (variables) to create maintainable stylesheets and dynamic theming systems.",
    date: "Dec 5, 2024",
    readTime: "7 min read",
    tags: ["CSS", "Variables"],
  },
  {
    id: "6",
    title: "Next.js App Router Deep Dive",
    description:
      "Complete guide to Next.js App Router including server components, streaming, and the new file-based routing system.",
    date: "Dec 3, 2024",
    readTime: "15 min read",
    tags: ["Next.js", "React"],
  },
  {
    id: "7",
    title: "Web Components in 2024",
    description:
      "Explore the current state of Web Components and how they fit into modern frontend development workflows.",
    date: "Nov 30, 2024",
    readTime: "9 min read",
    tags: ["Web Components", "Standards"],
  },
  {
    id: "8",
    title: "Tailwind CSS Best Practices",
    description:
      "Learn how to structure and organize Tailwind CSS classes for maintainable and scalable styling in large projects.",
    date: "Nov 28, 2024",
    readTime: "8 min read",
    tags: ["Tailwind", "CSS"],
  },
  {
    id: "9",
    title: "JavaScript Testing Strategies",
    description:
      "Comprehensive guide to testing JavaScript applications with Jest, Testing Library, and modern testing approaches.",
    date: "Nov 25, 2024",
    readTime: "11 min read",
    tags: ["Testing", "JavaScript"],
  },
]

export function LogIndex() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredPosts, setFilteredPosts] = React.useState(logPosts)

  React.useEffect(() => {
    const filtered = logPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredPosts(filtered)
  }, [searchQuery])

  return (
    <>
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-50 backdrop-blur">
        <div className="container flex mx-auto px-2 py-3">
          <div className="flex flex-col items-center sm:flex-row gap-4 w-full items-start">
          <div className="flex items-center gap-2">
            <Link href="/">
                <Button variant="ghost" size="icon" aria-label="Back to homepage" className="rounded-full cursor-pointer">
                <ArrowLeft className="h-4 w-4" />
                </Button>
            </Link>
                <h1 className="text-2xl font-bold whitespace-nowrap">The Log</h1>
          </div>
            <div className="max-w-2xl w-full">
                <SearchInput
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Log Posts Grid */}
      <div className="container mx-auto px-4 py-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group"
            >
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
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-2">No articles found</div>
            <p className="text-sm text-muted-foreground">Try adjusting your search terms or browse all articles</p>
          </div>
        )}
      </div>
    </>
  )
}
