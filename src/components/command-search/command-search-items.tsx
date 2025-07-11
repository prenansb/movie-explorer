import Image from 'next/image'
import { ItemHoverCard } from '@/components/item-hover-card'
import { Skeleton } from '@/components/ui/skeleton'
import { tmdbImage } from '@/lib/tmdb/image'
import { Movie } from '@/types/movie'
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from '@radix-ui/react-hover-card'
import { Link } from 'next-view-transitions'

type CommandSearchItemProps<T> = { item: T }

export function CommandSearchMovie({ item }: CommandSearchItemProps<Movie>) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Link
          href={`/movie/${item.id}`}
          className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
        >
          <span className="truncate text-sm whitespace-nowrap">{item.title}</span>

          <span className="text-muted-foreground text-xs whitespace-nowrap">
            {item.release_date !== '' && new Date(item.release_date).getFullYear()}
          </span>
        </Link>
      </HoverCardTrigger>

      <HoverCardPortal>
        <HoverCardContent
          className="w-[320px] overflow-hidden rounded-lg p-0"
          side="top"
          align="start"
        >
          <ItemHoverCard.Banner>
            {item.backdrop_path && (
              <Image src={tmdbImage(item.backdrop_path)} alt={item.title} fill />
            )}
          </ItemHoverCard.Banner>

          <ItemHoverCard.Information>
            <ItemHoverCard.Poster>
              {item.poster_path && (
                <Image
                  src={tmdbImage(item.poster_path, 'w500')}
                  alt={item.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              )}
            </ItemHoverCard.Poster>

            <ItemHoverCard.Summary>
              <ItemHoverCard.Title>{item.title}</ItemHoverCard.Title>

              <ItemHoverCard.Overview>{item.overview}</ItemHoverCard.Overview>
            </ItemHoverCard.Summary>
          </ItemHoverCard.Information>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}

export function CommandSearchSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-sm p-2">
      <Skeleton className="h-[2ex] w-[20ch]" />
      <Skeleton className="h-[2ex] w-[4ch]" />
    </div>
  )
}
