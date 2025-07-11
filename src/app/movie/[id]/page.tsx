import { Suspense } from 'react'
import { fetchMovies } from '@/lib/api'
import { MovieDetails } from './_components/movie-details'

export async function generateStaticParams() {
  const { results } = await fetchMovies({ page: 1 })

  return results.map(movie => ({ id: movie.id.toString() }))
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense>
      <MovieDetails id={Number(id)} />
    </Suspense>
  )
}
