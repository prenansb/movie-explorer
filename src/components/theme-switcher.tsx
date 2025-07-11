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
    <div ref={() => setMounted(true)} className="flex rounded-full border px-2 py-[5px]">
      {themes.map(currentTheme => (
        <div
          className={cn(
            'hover:text-foreground text-muted-foreground cursor-pointer rounded-full border border-transparent p-1 transition-all',
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
