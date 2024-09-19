import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/members/present')({
  component: () => <div>Hello /members/present!</div>,
})
