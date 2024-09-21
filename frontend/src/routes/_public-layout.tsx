import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_public-layout')({
  component: () => <Outlet />
});
