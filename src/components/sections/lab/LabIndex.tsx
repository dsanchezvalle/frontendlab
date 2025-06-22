'use client'

import {useState, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar"
import { mockProjects } from "./mocks"
import type { Project } from "@/types"
import { useDebouncedValue, useSearch } from "@/hooks"
import { CardGrid } from "@/components/shared/CardGrid"
// import { useDebouncedFetch } from "@/hooks/useDebouncedFetch" // Ready to swap later

export function LabIndex() {
  const [searchQuery, setSearchQuery] = useState("")
  
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filterFn = useCallback(
    (project: Project, query: string) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    []
  )

  // Using mock data for now, replace with actual data fetching logic later
  const { results: filteredProjects, isLoading } = useSearch({
    data: mockProjects,
    query: debouncedSearchQuery,
    filterFn,
  })

  //When using real API:
  // const { results: filteredProjects, isLoading } = useDebouncedFetch(searchQuery, '/api/projects')                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

  return (
    <>
      {/* Sticky Search Header */}
      <StickyTopSearchBar
        title="The Lab"
        onSearchChange={setSearchQuery}
      />

      {/* Projects Grid */}
      <CardGrid isLoading={isLoading} >
          {filteredProjects.map((project) => (
            <Link href={project.id === "1" ? "/projects/1" : "#"} key={project.id}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl" aria-hidden="true">
                      {project.icon}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs font-medium font-sans">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <CardTitle className="text-xl leading-tight font-sans">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm leading-relaxed font-serif line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
      </CardGrid>
    </>
  )
}
