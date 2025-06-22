import { useState, useEffect } from "react"

export function useDebouncedFetch<T>(query: string, url: string, delay = 300) {
  const [results, setResults] = useState<T[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query) return

    const handler = setTimeout(() => {
      setIsLoading(true)
      fetch(`${url}?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .finally(() => setIsLoading(false))
    }, delay)

    return () => clearTimeout(handler)
  }, [query, url, delay])

  return { results, isLoading }
}
