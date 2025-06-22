'use client'

import * as React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import SearchInput from "@/components/shared/SearchInput"

type StickyTopSearchBarProps = {
  title: string
  backHref?: string
  onSearchChange?: (query: string) => void
}

export function StickyTopSearchBar({
  title,
  backHref = "/",
  onSearchChange
}: StickyTopSearchBarProps) {
  const [query, setQuery] = React.useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearchChange?.(value)
  }

  return (
    <div className="sticky top-0 z-50 backdrop-blur">
      <div className="container flex mx-auto px-2 py-3">
        <div className="flex flex-col sm:flex-row gap-4 w-full items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Link href={backHref}>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Back to homepage"
                className="rounded-full cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold whitespace-nowrap">{title}</h1>
          </div>
          <div className="max-w-2xl w-full">
            <SearchInput value={query} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
