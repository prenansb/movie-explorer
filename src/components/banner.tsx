import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type BannerProps = {
  url?: string
} & ComponentProps<'div'>

export const Banner = ({ url, className, ...props }: BannerProps) => {
  return (
    <div
      {...props}
      className={cn(
        'aspect-[16/7] max-h-[55dvh] w-full overflow-hidden border-b md:rounded-lg lg:border',
        !url && 'bg-background border-dashed',
        className,
      )}
    >
      <div
        style={{
          backgroundImage: `url('${url}')`,
          backgroundSize: 'cover',
        }}
        className="h-full w-full"
      />
    </div>
  )
}
