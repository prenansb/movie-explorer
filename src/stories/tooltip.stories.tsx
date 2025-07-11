import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { expect, userEvent, waitFor, within } from "storybook/test";

const meta: Meta<typeof TooltipContent> = {
  title: "ui/Tooltip",
  component: TooltipContent,
  tags: ["autodocs"],
  argTypes: {
    side: {
      options: ["top", "bottom", "left", "right"],
      control: {
        type: "radio",
      },
    },
    children: {
      control: "text",
    },
  },
  args: {
    side: "top",
    children: "Add to library",
  },
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add</span>
        </TooltipTrigger>
        <TooltipContent {...args} />
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof TooltipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = {
  args: {
    side: "bottom",
  },
};

export const Left: Story = {
  args: {
    side: "left",
  },
};

export const Right: Story = {
  args: {
    side: "right",
  },
};

export const ShouldShowOnHover: Story = {
  name: "when hovering over trigger, should show hover tooltip content",
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement, step }) => {
    const canvasBody = within(canvasElement.ownerDocument.body);
    const triggerBtn = await canvasBody.findByRole("button", { name: /add/i });

    await step("hover over trigger", async () => {
      await userEvent.hover(triggerBtn);
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="tooltip-content"]',
          ),
        ).toBeVisible(),
      );
    });

    await step("unhover trigger", async () => {
      await userEvent.unhover(triggerBtn);
      await waitFor(() =>
        expect(
          canvasElement.ownerDocument.body.querySelector(
            '[data-slot="tooltip-content"]',
          ),
        ).not.toBeVisible(),
      );
    });
  },
};  