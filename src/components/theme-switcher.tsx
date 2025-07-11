'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Monitor, MoonStar, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

type Theme = 'system' | 'light' | 'dark'

const mappedThemeIcon: Record<Theme, React.ReactNode> = {
  dark: <MoonStar className="size-4" />,
  light: <Sun className="size-4" />,
  system: <Monitor className="size-4" />,
}

const themes = ['system', 'light', 'dark'] as const

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  const resolvedTheme = mounted ? theme : undefined

  return (
    <div ref={() => setMounted(true)} className="-mr-1.5 flex rounded-full border">
      {themes.map(currentTheme => (
        <div
          className={cn(
            'hover:text-foreground text-muted-foreground cursor-pointer rounded-full border-transparent p-1 transition-all first:border-r last:border-l',
            currentTheme === resolvedTheme && 'border-border text-foreground',
          )}
          onClick={() => setTheme(currentTheme)}
          key={currentTheme}
        >
          {mappedThemeIcon[currentTheme]}
        </div>
      ))}
    </div>
  )
}
