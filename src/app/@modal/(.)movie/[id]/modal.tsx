'use client'

import { useRouter } from 'next/navigation'
import { MovieDetails } from '@/app/movie/[id]/_components/movie-details'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Movie } from '@/types/movie'
import { Title } from '@radix-ui/react-dialog'

type ModalProps = {
  movie: Movie
}

export function Modal({ movie }: ModalProps) {
  const router = useRouter()

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="lg:max-w-5xl">
        <Title className="sr-only">Movie Details</Title>

        <MovieDetails movie={movie} />
      </DialogContent>
    </Dialog>
  )
}
