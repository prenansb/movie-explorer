import { useEffect, useState } from 'react'
import { detectOperatingSystem } from '@/utils/detect-operational-system'
import { CommandIcon } from 'lucide-react'

export function CommandSearchIcon() {
  const [os, setOS] = useState<string | undefined>(undefined)

  useEffect(() => {
    setOS(detectOperatingSystem())
  }, [])

  if (!os || os === 'iOS') {
    return null
  }

  if (os === 'Mac OS') {
    return (
      <div className="bg-muted text-muted-foreground hidden items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] lg:flex">
        <CommandIcon size={12} />K
      </div>
    )
  }

  return (
    <div className="bg-muted text-muted-foreground hidden items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] lg:flex">
      CTRL + K
    </div>
  )
}
