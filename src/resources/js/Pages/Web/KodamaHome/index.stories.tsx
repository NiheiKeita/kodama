import type { Meta, StoryObj } from '@storybook/react'
import { KodamaHome } from '.'

const meta: Meta<typeof KodamaHome> = {
  title: 'views/Web/KodamaHome',
  component: KodamaHome,
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
