import { createFileRoute, Outlet } from '@tanstack/react-router';
import { MainLayout } from '../layout/MainLayout';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { RequiredAuth } from '../features/Auth/components/RequiredAuth';

export const Route = createFileRoute('/_protected-layout')({
  component: () => <LayoutPage />
});

function LayoutPage() {
  return (
    <RequiredAuth>
      <MainLayout>
        <Outlet />
        <TanStackRouterDevtools />
      </MainLayout>
    </RequiredAuth>
  );
}