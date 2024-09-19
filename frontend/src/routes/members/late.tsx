import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/members/late')({
  component: () => <div>Hello /members/late!</div>,
})
