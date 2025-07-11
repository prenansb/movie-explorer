import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

const meta = {
  title: 'ui/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  render: args => (
    <HoverCard {...args}>
      <HoverCardTrigger>Hover</HoverCardTrigger>
      <HoverCardContent>
        The React Framework - created and maintained by @vercel.
      </HoverCardContent>
    </HoverCard>
  ),
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof HoverCard>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Instant: Story = {
  args: {
    openDelay: 0,
    closeDelay: 0,
  },
}

export const ShouldShowOnHover: Story = {
  name: 'when hovering over trigger, should show hover card content',
  tags: ['!dev', '!autodocs'],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body)

    await step('Hover over the trigger element', async () => {
      await userEvent.hover(await canvasBody.findByText(/hover/i))
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="hover-card-content"]',
          ),
        ).toBeVisible(),
      )
    })
    await step('Unhover the trigger element', async () => {
      await userEvent.unhover(await canvasBody.findByText(/hover/i))
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="hover-card-content"]',
          ),
        ).toBeNull(),
      )
    })
  },
}
