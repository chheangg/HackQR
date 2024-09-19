import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/members/absent')({
  component: () => <div>Hello /members/absent!</div>,
})
