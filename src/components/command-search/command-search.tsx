'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CommandSearchGroup } from '@/components/command-search/command-search-group'
import { CommandSearchIcon } from '@/components/command-search/command-search-icon'
import {
  CommandSearchMovie,
  CommandSearchSkeleton,
} from '@/components/command-search/command-search-items'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command'
import { searchMovies } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import { v4 } from 'uuid'

export function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 500)
  const pathname = usePathname()

  const { data, isLoading } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => await searchMovies({ query: debouncedSearch, page: 1 }),
    staleTime: 1000,
  })

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (open) setOpen(false)
  }, [pathname])

  const movies = data?.results

  const hasResults = Boolean(movies?.length)

  return (
    <>
      <Button
        variant="outline"
        className="text-muted-foreground flex w-full justify-between gap-2 px-3 text-sm"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center gap-2">
          <Search size={16} />
          Pesquisar
        </div>

        <CommandSearchIcon />
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput
            placeholder="Pesquisar"
            onValueChange={setSearch}
            defaultValue={search}
          />

          <CommandList className="">
            {isLoading && (
              <div className="space-y-8">
                <CommandSearchGroup heading="Filmes">
                  {Array.from({ length: 5 }).map(() => (
                    <CommandSearchSkeleton key={v4()} />
                  ))}
                </CommandSearchGroup>
              </div>
            )}

            {hasResults ? (
              <CommandSearchGroup heading="Filmes">
                {movies?.map(movie => (
                  <CommandSearchMovie item={movie} key={movie.id} />
                ))}
              </CommandSearchGroup>
            ) : (
              <p className="p-8 text-center">Nenhum resultado encontrado.</p>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
