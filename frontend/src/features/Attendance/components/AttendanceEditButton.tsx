
import { parse, toDate } from "date-fns";
import { Button } from "../../../components/ui/button";
import { AttendanceForm } from "./AttendanceForm";
import { Edit } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Attendance } from "../types/Attendance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAttendance } from "../../../api/attendance";

interface AttendanceEditButtonProps {
  row: Row<Attendance>;
}

export function AttendanceEditButton({ row } : AttendanceEditButtonProps) {
  const queryClient = useQueryClient();
  const attendanceMutation = useMutation({
    mutationFn: (attendanceDto: Attendance) => {
      return updateAttendance(attendanceDto);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['attendances']
      });
    }
  });

  function onUpdateAttendance(attendanceDto: Attendance) {
    attendanceMutation.mutate(attendanceDto);
  }

  const attendanceDto = {
    date: parse(row.getValue('date'), 'yyyy-MM-dd', new Date()),
    timeStart: toDate(row.getValue('timeStart')),
    timeLate: toDate(row.getValue('timeLate')),
    timeEnd: toDate(row.getValue('timeEnd'))
  };

  console.log(attendanceDto, row.getValue('date'));
  
  return (
    <AttendanceForm attendance={attendanceDto} onSubmit={onUpdateAttendance} title="Update Attendance Form">
      <Button className='bg-yellow-500 hover:bg-yellow-600' size='icon'><Edit /></Button>
    </AttendanceForm>
  );
}