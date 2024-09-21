import { createFileRoute } from '@tanstack/react-router';
import { AttendanceDataTable } from '../../../features/Attendance/components/AttendanceDataTable';

export const Route = createFileRoute('/_protected-layout/attendances/')({
  component: () => <AttendancePage />
});

function AttendancePage() {
  return <AttendanceDataTable />;
}
