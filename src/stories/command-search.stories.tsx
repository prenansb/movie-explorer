import { CommandSearch } from '@/components/command-search/command-search'
import type { Movie } from '@/types/movie'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const mockMovies = [
  {
    id: 1,
    title: 'O Poderoso Chefão',
    release_date: '1972-03-24',
    poster_path: '',
    adult: false,
    overview: '',
    genre_ids: [],
    original_title: 'The Godfather',
    original_language: 'en',
    backdrop_path: '',
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
  },
  {
    id: 2,
    title: 'Interestelar',
    release_date: '2014-11-05',
    poster_path: '',
    adult: false,
    overview: '',
    genre_ids: [],
    original_title: 'Interstellar',
    original_language: 'en',
    backdrop_path: '',
    popularity: 0,
    vote_count: 0,
    video: false,
    vote_average: 0,
  },
] as Movie[]

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

queryClient.setQueryDefaults(['search'], {
  queryFn: async () => ({
    page: 1,
    results: mockMovies,
    total_pages: 1,
    total_results: mockMovies.length,
  }),
  staleTime: Infinity,
})

const meta = {
  title: 'CommandSearch',
  component: CommandSearch,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} satisfies Meta<typeof CommandSearch>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    primary: true,
    label: 'CommandSearch',
  },
}
