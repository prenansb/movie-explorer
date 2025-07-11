import { Skeleton } from '@/components/ui/skeleton'
import { Movie } from '@/types/movie'
import { Link } from 'next-view-transitions'

type CommandSearchItemProps<T> = { item: T }

export function CommandSearchMovie({ item }: CommandSearchItemProps<Movie>) {
  return (
    <Link
      href={`/movie/${item.id}`}
      className="hover:bg-muted flex cursor-pointer items-center justify-between gap-4 rounded-sm p-2"
    >
      <span className="truncate text-sm whitespace-nowrap">{item.title}</span>

      <span className="text-muted-foreground text-xs whitespace-nowrap">
        {item.release_date !== '' && new Date(item.release_date).getFullYear()}
      </span>
    </Link>
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
