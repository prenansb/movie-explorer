import type { PropsWithChildren } from 'react'

function Banner(props: PropsWithChildren) {
  return (
    <figure
      className="bg-muted dark:bg-muted/25 relative aspect-video overflow-hidden"
      {...props}
    />
  )
}

function Information(props: PropsWithChildren) {
  return <div className="flex gap-2 p-4" {...props} />
}

function Poster(props: PropsWithChildren) {
  return (
    <div className="w-1/3">
      <figure
        className="bg-muted relative -mt-12 aspect-[2/3] overflow-hidden rounded-lg border shadow"
        {...props}
      />
    </div>
  )
}

function Summary(props: PropsWithChildren) {
  return <div className="w-2/3 space-y-1" {...props} />
}

function Title(props: PropsWithChildren) {
  return <span className="text-sm font-bold" {...props} />
}

function Overview(props: PropsWithChildren) {
  return <span className="text-muted-foreground line-clamp-3 text-xs" {...props} />
}

export const ItemHoverCard = {
  Banner,
  Information,
  Poster,
  Summary,
  Title,
  Overview,
}
