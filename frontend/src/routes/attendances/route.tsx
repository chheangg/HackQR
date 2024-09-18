import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/attendances')({
  component: () => <div>Hello /attendances!</div>,
})
