'use client'

import { useRouter } from 'next/navigation'
import { MouseEvent, ReactNode } from 'react'

type ResponsiveLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

export function ResponsiveLink({
  href,
  children,
  className,
  ...props
}: ResponsiveLinkProps) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia('(max-width: 1024px)').matches) {
      return
    }
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  )
}
