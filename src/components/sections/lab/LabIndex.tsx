"use client";

import { useState, useCallback } from "react";
import { StickyTopSearchBar } from "@/components/shared/StickyTopSearchBar";
import { mockExperiments } from "./mocks";
import type { LabExperiment } from "@/types";
import { useDebouncedValue, useSearch } from "@/hooks";
import { CardGrid } from "@/components/shared/CardGrid";
import { PreviewCard } from "@/components/shared/PreviewCard";
// import { useDebouncedFetch } from "@/hooks/useDebouncedFetch" // Ready to swap later

export function LabIndex() {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  const filterFn = useCallback(
    (project: LabExperiment, query: string) =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description.toLowerCase().includes(query.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      ),
    []
  );

  // Using mock data for now, replace with actual data fetching logic later
  const { results: filteredExperiments, isLoading } = useSearch({
    data: mockExperiments,
    query: debouncedSearchQuery,
    filterFn,
  });

  //When using API:
  // const { results: filteredExperiments, isLoading } = useDebouncedFetch(searchQuery, '/api/experiments')

  return (
    <>
      {/* Sticky Search Header */}
      <StickyTopSearchBar title="The Lab" onSearchChange={setSearchQuery} />

      {/* Experiments Grid */}
      <CardGrid isLoading={isLoading}>
        {filteredExperiments.map((experiment) => (
          <PreviewCard
            key={experiment.id}
            title={experiment.title}
            description={experiment.description}
            tags={experiment.tags}
            icon={<experiment.icon />}
            //imageUrl={experiment.imageUrl}
            href={`/experiments/${experiment.id}`}
            titleAs={"h2"}
          />
        ))}
      </CardGrid>
    </>
  );
}
