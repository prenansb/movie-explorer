import Link from 'next/link'
import { CommandSearch } from '@/components/command-search/command-search'
import { Home } from 'lucide-react'

export function Navbar() {
  return (
    <header className="bg-background mx-auto w-full max-w-6xl border-b px-4 py-2 lg:my-4 lg:rounded-full lg:border">
      <div className="flex items-center justify-between">
        <Link
          className="hover:bg-accent flex items-center gap-2 rounded-sm px-3 py-2 text-sm"
          href="/"
        >
          <Home size={14} />
          Página inicial
        </Link>

        <div className="w-full max-w-[400px]">
          <CommandSearch />
        </div>
      </div>
    </header>
  )
}
