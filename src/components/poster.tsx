import Image from 'next/image'
import type { ComponentProps } from 'react'
import { tmdbImage } from '@/lib/tmdb/image'
import { cn } from '@/lib/utils'
import { Image as LucideImage } from 'lucide-react'

type PosterProps = {
  url?: string | null
  alt: string
} & ComponentProps<'div'>

export const Poster = ({ url, alt, className, ...props }: PosterProps) => {
  return (
    <div
      className={cn(
        'bg-muted text-muted relative flex aspect-[2/3] w-full items-center justify-center overflow-hidden rounded-lg border shadow',
        className,
      )}
      {...props}
    >
      {url ? (
        <Image
          fill
          className="object-fill"
          loading="lazy"
          sizes="100%"
          alt={alt}
          src={tmdbImage(url)}
        />
      ) : (
        <LucideImage size={24} />
      )}
    </div>
  )
}
