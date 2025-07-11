import { Movie } from '@/types/movie'

const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  'Content-Type': 'application/json',
}

export type MoviesResponse = {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

type FetchMoviesParams = {
  page?: number
}

export async function fetchMovies({
  page = 1,
}: FetchMoviesParams): Promise<MoviesResponse> {
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/discover/movie?language=pt-BR&sort_by=popularity.desc&include_video=false&include_adult=false&page=${page}`

  const response = await fetch(url, { headers, cache: 'force-cache' })

  if (!response.ok) {
    throw new Error('Failed to fetch movies')
  }

  return response.json()
}

type SearchMoviesParams = {
  query: string
  page?: number
}

export async function searchMovies({
  query,
  page = 1,
}: SearchMoviesParams): Promise<MoviesResponse> {
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/search/movie?language=pt-BR&include_adult=false&page=${page}&query=${encodeURIComponent(query)}`

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error('Failed to search movies')
  }

  return response.json()
}

type FetchMovieByIdParams = {
  id: number
}

export async function fetchMovieById({ id }: FetchMovieByIdParams): Promise<Movie> {
  const url = `${process.env.NEXT_PUBLIC_TMDB_BASE_URL}/movie/${id}?language=pt-BR`

  const response = await fetch(url, { headers, cache: 'force-cache' })

  if (!response.ok) {
    throw new Error('Failed to fetch movie')
  }

  return response.json()
}
