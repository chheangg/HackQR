import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/members')({
  component: () => <div>Hello /members!</div>,
})
