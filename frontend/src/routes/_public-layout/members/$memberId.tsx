import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public-layout/members/$memberId')({
  component: () => <div>Hello /_public-layout/members/$memberId!</div>
});
