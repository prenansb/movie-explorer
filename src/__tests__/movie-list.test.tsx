import { MovieList } from '@/components/movie-list'
// Re-import the mocked function for assertions
import { fetchMovies as fetchMoviesMock } from '@/lib/api'
import { waitFor } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { renderWithQuery } from './test-utils'

// ------- Mocks ------- //

// Mock react-intersection-observer so we can programmatically toggle `inView`
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

// ------- Test ------- //

test('loads next page when sentinel enters the viewport', async () => {
  const { rerender } = renderWithQuery(<MovieList />)

  // Wait for the first page to load
  await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(1))
  expect(fetchMoviesMock).toHaveBeenCalledWith({ page: 1 })

  // Simulate the skeleton sentinel coming into view
  inView = true
  rerender(<MovieList />)

  // Wait for the second page to be fetched
  await waitFor(() => expect(fetchMoviesMock).toHaveBeenCalledTimes(2))
  expect(fetchMoviesMock).toHaveBeenLastCalledWith({ page: 3 })
})
