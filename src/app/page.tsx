import { Suspense } from 'react'
import { MovieList } from '@/components/movie-list'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <main className="min-h-screen w-full">
      <section className="mx-auto w-full max-w-6xl space-y-4 px-4 py-4">
        <div>
          <h1 className="text-2xl font-bold">Descubra</h1>
          <p className="text-muted-foreground">Explore uma vasta seleção de filmes.</p>
        </div>

        <Suspense fallback={<MovieGridSkeleton />}>
          <MovieList />
        </Suspense>
      </section>
    </main>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="bg-card overflow-hidden rounded-lg border">
          <div className="relative aspect-[2/3]">
            <Skeleton className="absolute inset-0" />
          </div>
        </div>
      ))}
    </div>
  )
}
