import { createFileRoute } from '@tanstack/react-router';
import { MemberDataTable } from '../../../features/Member/components/MemberDataTable';
import { MemberStatus } from '../../../features/Member/types/MemberStatus';

export const Route = createFileRoute('/_protected-layout/members/present')({
  component: () => <MemberDataTable status={MemberStatus.PRESENT} />
});
