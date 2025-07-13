'use client'

import Link from 'next/link'
import { ReactNode } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'

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
  const isMobile = useMediaQuery('only screen and (max-width : 992px)')

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
