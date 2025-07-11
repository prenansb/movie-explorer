import Link from 'next/link'
import { CommandSearch } from '@/components/command-search/command-search'
import { Home } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'

export function Navbar() {
  return (
    <header className="bg-background mx-auto w-full max-w-6xl border-b px-2.5 py-2 lg:my-4 lg:rounded-full lg:border">
      <div className="flex items-center justify-between gap-2">
        <Link
          className="hover:bg-accent flex items-center gap-2 rounded-full px-3 py-2 text-sm"
          href="/"
        >
          <Home size={16} />

          <span className="hidden lg:block">Página inicial</span>
        </Link>

        <div className="flex w-full max-w-[400px] items-center gap-3">
          <CommandSearch />

          <ThemeSwitcher />
        </div>
      </div>
    </header>
  )
}
