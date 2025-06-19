'use client'

import { Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

type AuthorCardProps = {
  initials: string
  name: string
  bio: string
  onFollow?: () => void
  onViewAll?: () => void
}

export default function AuthorCard({
  initials,
  name,
  bio,
  onFollow,
  onViewAll
}: AuthorCardProps) {
  return (
    <div className="bg-muted/30 p-6 rounded-lg mb-12">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-medium">
          {initials}
        </div>
        <div>
          <h3 className="font-medium text-lg mb-2 font-sans">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3 font-serif">{bio}</p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-sans"
              onClick={onFollow}
            >
              <Twitter className="h-3 w-3 mr-1" />
              Follow
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-xs font-sans"
              onClick={onViewAll}
            >
              View all articles
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
