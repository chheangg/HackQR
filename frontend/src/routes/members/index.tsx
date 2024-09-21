import { createFileRoute } from '@tanstack/react-router';
import { MemberDataTable } from '../../features/Member/components/MemberDataTable';
import { MemberStatus } from '../../features/Member/types/MemberStatus';

export const Route = createFileRoute('/members/')({
  component: () => <MemberNotYetArrivedPage />
});

function MemberNotYetArrivedPage() {
  return (
    <MemberDataTable status={MemberStatus.NOT_YET_ARRIVED} />
  );
}