import NextImage, { type ImageProps } from 'next/image'
import { forwardRef, type ComponentProps } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const Root = forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => {
  return <div className="space-y-2" {...props} ref={ref} />
})
Root.displayName = 'Root'

function Image(props: ImageProps) {
  return (
    <div className="bg-muted relative aspect-[2/3] w-full overflow-hidden rounded-lg border shadow">
      <NextImage {...props} fill />
    </div>
  )
}

function Details(props: ComponentProps<'div'>) {
  return <div className="flex flex-col gap-0" {...props} />
}

function Title(props: ComponentProps<'h3'>) {
  return <h3 className="line-clamp-1 text-sm" {...props} />
}

function Year(props: ComponentProps<'span'>) {
  return <span className="text-muted-foreground text-xs" {...props} />
}

const PosterCardSkeleton = forwardRef<HTMLDivElement>((_, ref) => (
  <Root ref={ref}>
    <Skeleton className="aspect-[2/3] w-full" />
  </Root>
))
PosterCardSkeleton.displayName = 'Skeleton'

export const PosterCard = {
  Root,
  Image,
  Details,
  Title,
  Year,
  Skeleton: PosterCardSkeleton,
}
