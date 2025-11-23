import type { Meta, StoryObj } from '@storybook/react'
import { KodamaGarden } from '.'

const meta: Meta<typeof KodamaGarden> = {
  title: 'views/Web/KodamaGarden',
  component: KodamaGarden,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    seeds: [
      { id: 1, seedType: 'bell', status: 'planted', posX: 0.3, posY: 0.4 },
      { id: 2, seedType: 'wind', status: 'acquired', posX: null, posY: null },
    ],
  },
}
