'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useMediaQuery } from '@/hooks/use-media-query'

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
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (isMobile) {
    return (
      <a href={href} className={className} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  )
}
