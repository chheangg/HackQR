import { createFileRoute } from '@tanstack/react-router';
import { MemberAttendanceDataTable } from '../../../features/Member/components/MemberAttendanceDataTable';
import { MemberStatus } from '../../../features/Member/types/MemberStatus';


export const Route = createFileRoute('/_protected-layout/members/late')({
  component: () => <MemberAttendanceDataTable status={MemberStatus.LATE} />
});
