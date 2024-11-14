import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected-layout/')({
  component: () => <Navigate to='/attendances' />
});
