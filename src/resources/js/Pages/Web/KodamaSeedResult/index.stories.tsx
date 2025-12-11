import type { Meta, StoryObj } from '@storybook/react'
import { KodamaSeedResult } from '.'

const meta: Meta<typeof KodamaSeedResult> = {
  title: 'views/Web/KodamaSeedResult',
  component: KodamaSeedResult,
}

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    code: 'ABC123',
    success: true,
    needsAuth: false,
    message: 'タネを手に入れました！',
    seed: { id: 1, seedType: 'bell', status: 'acquired', posX: null, posY: null },
  },
}

export const NeedAuth: Story = {
  args: {
    code: 'ABC123',
    success: false,
    needsAuth: true,
    message: 'ログインしてください',
    seed: null,
  },
}
