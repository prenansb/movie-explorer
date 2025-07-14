'use client'

import { useEffect } from 'react'
import { PosterCard } from '@/components/poster-card'
import { ResponsiveLink } from '@/components/responsive-link'
import { fetchMovies, MoviesResponse } from '@/lib/api'
import { tmdbImage } from '@/lib/tmdb/image'
import { Movie } from '@/types/movie'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { v4 } from 'uuid'

export function MovieList() {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['movies'],
      queryFn: ({ pageParam = 1 }) => fetchMovies({ page: pageParam }),
      getNextPageParam: lastPage => {
        const maxPages = Math.min(lastPage.total_pages, 500)
        return lastPage.page < maxPages ? lastPage.page + 1 : undefined
      },
      initialPageParam: 1,
    })
  const { inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  if (!data || isLoading) {
    return (
      <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-6">
        {Array.from({ length: 20 }).map(() => (
          <PosterCard.Skeleton key={v4()} />
        ))}
      </div>
    )
  }

  const seen = new Set<number>()
  const flatData = data.pages
    .flatMap((page: MoviesResponse) => page.results)
    .filter((movie: Movie) => {
      if (seen.has(movie.id)) {
        return false
      }
      seen.add(movie.id)
      return true
    })

  return (
    <div className="space-y-4">
      <div className="grid w-full grid-cols-3 gap-4 md:grid-cols-6">
        {flatData.map((movie: Movie) => (
          <ResponsiveLink href={`/movie/${movie.id}`} key={movie.id}>
            <PosterCard.Root>
              <PosterCard.Image
                src={tmdbImage(movie.poster_path, 'w500')}
                alt={movie.title}
              />
            </PosterCard.Root>
          </ResponsiveLink>
        ))}
      </div>
    </div>
  )
}
