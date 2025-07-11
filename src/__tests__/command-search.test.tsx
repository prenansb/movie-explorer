import { CommandSearch } from '@/components/command-search/command-search'
// Re-import the mocked function for assertions
import { searchMovies as searchMoviesMock } from '@/lib/api'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { renderWithQuery } from './test-utils'

vi.mock('@uidotdev/usehooks', () => ({
  useDebounce: (value: string) => value,
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '',
}))

const mockMovie = {
  id: 1,
  title: 'Mock Movie',
  release_date: '2020-01-01',
}

vi.mock('@/lib/api', () => ({
  searchMovies: vi.fn(async () => ({
    page: 1,
    results: [mockMovie],
    total_pages: 1,
    total_results: 1,
  })),
}))

afterEach(() => {
  vi.clearAllMocks()
  vi.useRealTimers()
})

test('should display search results when user types a query', async () => {
  renderWithQuery(<CommandSearch />)

  const openButton = screen.getByRole('button', { name: /Pesquisar/i })
  fireEvent.click(openButton)

  const input = await screen.findByPlaceholderText(/Pesquisar/i)
  fireEvent.input(input, { target: { value: 'Mock' } })

  await waitFor(() => expect(searchMoviesMock).toHaveBeenCalled())

  expect(await screen.findByText('Mock Movie')).toBeDefined()
})
