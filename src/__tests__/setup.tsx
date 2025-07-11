import { vi } from 'vitest'

vi.mock('next-view-transitions', () => ({
  Link: vi.fn(({ children, ...rest }) => <a {...rest}>{children}</a>),
}))
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
