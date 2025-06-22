type EmptyStateProps = {
  title?: string
  description?: string
  className?: string
}

export function EmptyState({
  title = "No results found",
  description = "Try adjusting your search.",
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="text-muted-foreground mb-2 font-sans">{title}</div>
      {description && (
        <p className="text-sm text-muted-foreground font-serif">{description}</p>
      )}
    </div>
  )
}

