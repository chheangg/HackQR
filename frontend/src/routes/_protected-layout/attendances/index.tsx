import { createFileRoute } from '@tanstack/react-router';
import { AttendanceDataTable } from '../../../features/Attendance/components/AttendanceDataTable';
import { AttendanceForm } from '../../../features/Attendance/components/AttendanceForm';
import { Button } from '../../../components/ui/button';
import { Attendance } from '../../../features/Attendance/types/Attendance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAttendance } from '../../../api/attendance';

export const Route = createFileRoute('/_protected-layout/attendances/')({
  component: () => <AttendancePage />
});

function AttendancePage() {
  const queryClient = useQueryClient();
  const attendanceMutation = useMutation({
    mutationFn: (attendanceDto: Attendance) => {
      return createAttendance(attendanceDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['attendances']
      });
    }
  });

  function onCreateAttendance(attendanceDto: Attendance) {
    attendanceMutation.mutate(attendanceDto);
  }

  return (
    <div>
      <div className='flex flex-row-reverse mb-4'>
        <AttendanceForm onSubmit={onCreateAttendance}>
          <Button className='bg-green-500 hover:bg-green-600'>Create Attendance Date</Button>
        </AttendanceForm>
      </div>
      <AttendanceDataTable />
    </div>
  );
}
