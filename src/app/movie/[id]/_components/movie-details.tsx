import { Banner } from '@/components/banner'
import { fetchMovieById } from '@/lib/api'
import { tmdbImage } from '@/lib/tmdb/image'
import { MovieInfos } from './movie-infos'

type MovieDetailsProps = {
  id: number
}

export const MovieDetails = async ({ id }: MovieDetailsProps) => {
  const movie = await fetchMovieById({ id })

  return (
    <div className="relative mx-auto max-w-6xl">
      <Banner url={tmdbImage(movie.backdrop_path ?? '')} />

      <section className="mx-auto my-8 max-w-4xl space-y-6">
        <MovieInfos movie={movie} />
      </section>
    </div>
  )
}
