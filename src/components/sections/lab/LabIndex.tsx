'use client'

import {useState, useCallback } from "react"
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar"
import { mockProjects } from "./mocks"
import type { Project } from "@/types"
import { useDebouncedValue, useSearch } from "@/hooks"
import { CardGrid } from "@/components/shared/CardGrid"
import { PreviewCard } from "@/components/shared/PreviewCard"
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

  //When using API:
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
          <PreviewCard
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            icon={<project.icon />}
            //imageUrl={project.imageUrl}
            href={`/projects/${project.id}`}
            titleAs={"h2"}
          />
        ))}
      </CardGrid>
    </>
  )
}
