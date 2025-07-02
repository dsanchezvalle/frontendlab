import React from "react"
import { SkeletonCard } from "./SkeletonCard"
import { EmptyState } from "./EmptyState"


type CardGridProps = {
    children: React.ReactNode
    isLoading?: boolean
    isEmpty?: boolean
    skeletonCount?: number
  }
  
export function CardGrid({ children, isEmpty, isLoading, skeletonCount }: CardGridProps) {
  const childArray = React.Children.toArray(children)
  const resolvedIsEmpty = isEmpty ?? childArray.length === 0

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {Array.from({ length: skeletonCount ?? 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !resolvedIsEmpty ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  )
}
