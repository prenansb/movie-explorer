export function tmdbImage(path: string, type: 'original' | 'w500' = 'original') {
  return `https://image.tmdb.org/t/p/${type}/${path}`
}
