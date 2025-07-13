import { fetchMovieById, fetchMovies } from '@/lib/api'
import { MovieDetails } from './_components/movie-details'

export const revalidate = 3600

export const dynamicParams = true

export async function generateStaticParams() {
  const promises = Array.from({ length: 10 }, (_, i) => fetchMovies({ page: i + 1 }))
  const pages = await Promise.all(promises)
  const results = pages.flatMap(page => page.results)

  return results.map(movie => ({ id: movie.id.toString() }))
}

export default async function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const movie = await fetchMovieById({ id: Number(id) })

  return <MovieDetails movie={movie} />
}
