import { unstable_ViewTransition as ViewTransition } from 'react'
import { Banner } from '@/components/banner'
import { tmdbImage } from '@/lib/tmdb/image'
import { Movie } from '@/types/movie'
import { MovieInfos } from './movie-infos'

type MovieDetailsProps = {
  movie: Movie
}

export function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <ViewTransition>
      <div className="relative mx-auto w-full max-w-6xl">
        <Banner url={tmdbImage(movie.backdrop_path ?? '')} />

        <section className="mx-auto my-8 max-w-4xl space-y-6">
          <MovieInfos movie={movie} />
        </section>
      </div>
    </ViewTransition>
  )
}
