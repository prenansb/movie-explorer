import { screen } from '@testing-library/dom'
import { expect, test } from 'vitest'
import Page from '../app/page'
import { renderWithQuery } from './test-utils'

test('Page', () => {
  renderWithQuery(<Page />)
  expect(screen.getByRole('heading', { name: 'Descubra' })).toBeDefined()
})
