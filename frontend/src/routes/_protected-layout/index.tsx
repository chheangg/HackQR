import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected-layout/')({
  component: () => <div>Hello /_protected-layout/!</div>
});
