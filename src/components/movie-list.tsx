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
  const { data, fetchNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['movies'],
    queryFn: ({ pageParam = 1 }) => fetchMovies({ page: pageParam }),
    getNextPageParam: lastPage => lastPage.page + 1,
    initialPageParam: 1,
  })
  const { ref, inView } = useInView({ threshold: 0 })

  useEffect(() => {
    if (inView && data?.pages && !isLoading) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage, data?.pages, isLoading])

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
  const lastPageData = data.pages[data.pages.length - 1]
  const isLastPage =
    !lastPageData ||
    lastPageData.page >= (lastPageData.total_pages > 500 ? 500 : lastPageData.total_pages)

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

        {!isLastPage && (
          <>
            <PosterCard.Skeleton ref={ref} />
            <PosterCard.Skeleton />
            <PosterCard.Skeleton />
          </>
        )}
      </div>
    </div>
  )
}
