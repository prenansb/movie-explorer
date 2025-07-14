# TMDB Movie Explorer

A modern web application for discovering and exploring movies using The Movie Database (TMDB) API, built with Next.js and TypeScript.

## Features

- 🎬 Browse popular movies with infinite scrolling
- 🔍 Command+K search with debounced input and results in a dialog
- 🖼️ Detailed movie pages with poster, overview, ratings, and more
- 📱 Fully responsive design for mobile and desktop
- 🌙 Dark/Light theme support
- 📊 Frontend observability with Grafana Faro
- ⚡ Optimized performance with React Query caching and infinite queries
- 🧪 Unit and integration tests with Vitest
- 📚 Component stories with Storybook

## Tech Stack

- **Framework**: Next.js 15 (with App Router and Turbopack support)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with plugins for animations and sorting
- **UI Components**: Shadcn/ui
- **Data Fetching**: @tanstack/react-query
- **Testing**: Vitest, React Testing Library
- **Documentation**: Storybook with addons for accessibility and docs
- **Linting/Formatting**: ESLint, Prettier with plugins
- **Observability**: Grafana Faro with OpenTelemetry
- **Other**: Next Themes, Intersection Observer, UUID

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended), npm, or yarn
- TMDB API key (set as NEXT_PUBLIC_TMDB_API_KEY in .env.local)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd movie-explorer
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm storybook` - Start Storybook
- `pnpm build-storybook` - Build Storybook

## Project Structure

```
├── .next/                 # Next.js build output
├── .storybook/            # Storybook configuration
├── public/                # Static assets
├── src/                   # Source code
│   ├── app/               # Next.js pages and layouts
│   │   ├── movie/[id]/   # Dynamic movie detail pages
│   │   └── page.tsx      # Home page
│   ├── components/        # Reusable UI components (e.g., MovieList, Navbar, Poster)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and API clients (e.g., TMDB API fetchers)
│   ├── providers/         # Context providers (e.g., Theme, QueryClient)
│   ├── stories/           # Storybook stories
│   ├── styles/            # Global CSS and Tailwind config
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Helper functions (e.g., cn for classnames)
│   ├── __tests__/         # Test files
│   └── middleware.ts      # Next.js middleware
├── node_modules/          # Dependencies
├── .gitignore             # Git ignore file
├── components.json        # Shadcn UI config
├── eslint.config.mjs      # ESLint configuration
├── next.config.ts         # Next.js config
├── package.json           # Project dependencies and scripts
├── pnpm-lock.yaml         # PNPM lockfile
├── postcss.config.mjs     # PostCSS config
├── README.md              # This file
├── tsconfig.json          # TypeScript config
├── vitest.config.js       # Vitest config
└── .vscode/               # VSCode settings
```

## API Integration

Uses TMDB API v3 with endpoints:

- `/discover/movie` - Discover popular movies
- `/search/movie` - Search movies
- `/movie/{id}` - Movie details

API key is expected in environment variable `NEXT_PUBLIC_TMDB_API_KEY`.

## Key Features Implementation

### Search with Debounce
- Uses useDebounce hook to delay API calls by 500ms
- Prevents excessive API requests during typing
- Displays results in a command dialog

### Infinite Scroll Pagination
- Automatic loading of more movies using Intersection Observer
- Maintains scroll position
- Deduplicates results with Set

### Movie Details Page
- Dedicated page for each movie with banner, poster, infos
- Fetches movie details on demand
- Responsive layout with view transitions

### Static Site Generation (SSG)
- Pre-generates pages for popular movies using generateStaticParams
- Improves initial load time and SEO
- Revalidates every hour

## Testing

The project includes tests for components, hooks, and utilities.

Run tests with:
```bash
pnpm test
```

## Storybook

Component documentation and visual testing:

```bash
pnpm storybook
```

Visit [http://localhost:6006](http://localhost:6006).

## Performance Optimizations

- Next.js Image optimization for posters and banners
- Infinite scrolling with Intersection Observer
- Caching with React Query
- Static generation for movie pages via generateStaticParams
- Debounced search to reduce API calls
- Theme switching without transitions on change