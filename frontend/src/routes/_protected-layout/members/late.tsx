import { createFileRoute } from '@tanstack/react-router';
import { MemberDataTable } from '../../../features/Member/components/MemberDataTable';
import { MemberStatus } from '../../../features/Member/types/MemberStatus';


export const Route = createFileRoute('/_protected-layout/members/late')({
  component: () => <MemberDataTable status={MemberStatus.LATE} />
});
