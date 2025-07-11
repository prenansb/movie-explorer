import { Suspense } from 'react'
import { MovieDetails } from './_components/movie-details'

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <Suspense>
      <MovieDetails id={Number(id)} />
    </Suspense>
  )
}
