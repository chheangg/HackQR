import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from '../layout/MainLayout';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createFileRoute('/_protected-layout')({
  component: () => <LayoutPage />
});

function LayoutPage() {
  return (
    <MainLayout>
      <Outlet />
      <TanStackRouterDevtools />
    </MainLayout>
  );
}