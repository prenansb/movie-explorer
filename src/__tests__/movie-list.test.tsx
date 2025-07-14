import { MovieList } from '@/components/movie-list'
import { fetchMovies as fetchMoviesMock } from '@/lib/api'
import { waitFor } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { renderWithQuery } from './test-utils'

let inView = false
const mockRef = vi.fn()

afterEach(() => {
  inView = false
  vi.clearAllMocks()
})

vi.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: mockRef,
    inView,
  }),
}))

vi.mock('next/navigation', async importOriginal => {
  const original = await importOriginal<typeof import('next/navigation')>()
  return {
    ...original,
    useRouter: () => ({
      push: vi.fn(),
    }),
  }
})

vi.mock('@/lib/api', () => ({
  fetchMovies: vi.fn(({ page = 1 } = {}) =>
    Promise.resolve({
      page,
      results: [
        {
          id: page,
          title: `Movie ${page}`,
          poster_path: '',
          release_date: '2020-01-01',
        },
      ],
      total_pages: 3,
      total_results: 3,
    }),
  ),
}))

test('loads next page when sentinel enters the viewport', async () => {
  const { rerender } = renderWithQuery(<MovieList />)

  await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(1))
  expect(fetchMoviesMock).toHaveBeenCalledWith({ page: 1 })

  inView = true
  rerender(<MovieList />)

  await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(2))
  expect(fetchMoviesMock).toHaveBeenLastCalledWith({ page: 2 })

  // Toggle inView to simulate scrolling
  inView = false
  rerender(<MovieList />)

  inView = true
  rerender(<MovieList />)

  await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(3))
  expect(fetchMoviesMock).toHaveBeenLastCalledWith({ page: 3 })
})
