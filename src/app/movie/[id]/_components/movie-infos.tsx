import Image from 'next/image'
import { Poster } from '@/components/poster'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Movie } from '@/types/movie'

type MovieInfosProps = { movie: Movie }

export const MovieInfos = ({ movie }: MovieInfosProps) => {
  const votes = (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge>
            <Image src="/tmdb.svg" width={50} height={1} alt="TMDB" className="mr-2" />

            {movie.vote_average.toFixed(1)}
          </Badge>
        </TooltipTrigger>

        <TooltipContent>
          <p>{movie.vote_count} votes</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <main className="space-y-4 p-4 lg:p-0">
      <div className="flex flex-row items-end gap-4 md:items-start">
        <aside className="-mt-20 w-2/5 space-y-2 md:w-1/3 lg:-mt-32">
          <Poster url={movie.poster_path} alt={movie.title} />
        </aside>

        <article className="flex w-3/5 flex-col gap-2 md:w-2/3">
          {movie.release_date && (
            <span className="text-muted-foreground text-xs">
              {new Date(movie.release_date).toLocaleDateString('pt-BR')}
            </span>
          )}

          <h1 className="text-lg font-bold md:text-4xl">{movie.title}</h1>

          <div className="hidden flex-wrap items-center gap-2 whitespace-nowrap md:flex">
            {votes}
          </div>

          <p className="text-muted-foreground hidden w-full max-w-6xl text-xs leading-5 md:block md:text-sm md:leading-6">
            {movie.overview}
          </p>
        </article>
      </div>

      <div className="space-y-2 md:hidden">
        <p className="text-muted-foreground text-sm/7">{movie.overview}</p>

        <div className="flex flex-wrap gap-2">{votes}</div>
      </div>
    </main>
  )
}
