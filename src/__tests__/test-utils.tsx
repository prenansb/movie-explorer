import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'

export function renderWithQuery(ui: React.ReactElement) {
  const client = new QueryClient()

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
  }

  return render(ui, { wrapper: Wrapper })
}
