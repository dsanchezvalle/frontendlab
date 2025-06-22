import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 space-y-4 animate-pulse">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
        
      </div>

      <Skeleton className="h-5 w-3/4 rounded" />

      <div className="space-y-2">
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-11/12 rounded" />
        <Skeleton className="h-3 w-5/6 rounded" />
      </div>

      <div className="flex gap-2 mt-2">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  )
}
