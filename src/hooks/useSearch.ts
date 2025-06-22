import { useEffect, useState } from "react"

type SearchOptions<T> = {
  data: T[]
  query: string
  filterFn: (item: T, query: string) => boolean
}

export function useSearch<T>({ data, query, filterFn }: SearchOptions<T>) {
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timeout = setTimeout(() => {
      const filtered = data.filter((item) => filterFn(item, query))
      setResults(filtered)
      setIsLoading(false)
    }, 250) // Simulates a small delay

    return () => clearTimeout(timeout)
  }, [query, data, filterFn])

  return { results, isLoading }
}
