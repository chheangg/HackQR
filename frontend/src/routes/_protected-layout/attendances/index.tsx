import { createFileRoute } from '@tanstack/react-router';
import { AttendanceDataTable } from '../../../features/Attendance/components/AttendanceDataTable';
import { AttendanceForm } from '../../../features/Attendance/components/AttendanceForm';
import { Button } from '../../../components/ui/button';

export const Route = createFileRoute('/_protected-layout/attendances/')({
  component: () => <AttendancePage />
});

function AttendancePage() {
  return (
    <div>
      <div className='flex flex-row-reverse mb-4'>
        <AttendanceForm>
          <Button className='bg-green-500 hover:bg-green-600'>Create Attendance Date</Button>
        </AttendanceForm>
      </div>
      <AttendanceDataTable />
    </div>
  );
}
