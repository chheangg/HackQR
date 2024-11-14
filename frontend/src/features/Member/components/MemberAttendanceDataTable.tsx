import { useQueries } from "@tanstack/react-query";
import { MemberStatus } from "../types/MemberStatus";
import { getAllMembers } from "../api/member";
import { useContext } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";
import { absentAttendanceColumns } from "./absentAttendanceColumns";
import { DataTable } from "../../../components/ui/data-table";
import { getAttendanceByDate } from "../../../api/attendance";
import { attendanceColumns } from "./attendanceColumns";

interface MemberAttendanceDataTableProps {
  status?: MemberStatus,
}

export function MemberAttendanceDataTable({ status }: MemberAttendanceDataTableProps) {
  const { date } = useContext(MemberTableContext);

  const results = useQueries({
    queries: [
      {
        queryKey: ['attendances'],
        queryFn: async () => await getAttendanceByDate(date),
        staleTime: Infinity
      },
      {
        queryKey: ['members-' + status + '-' + date],
        queryFn: async () => await getAllMembers({ status, date }),
        staleTime: Infinity
      }
    ]
  });

  const { isError: isErrorAttendance, isLoading: isLoadingAttendance, data: attendanceDate } = results[0];
  const { isError: isErrorMember, isLoading: isLoadingMember, data: member } = results[1];


  if (isErrorMember || isErrorAttendance) {
    return "Error";
  }

  if (isLoadingMember || isLoadingAttendance) {
    return "Loading";
  }

  if (status === MemberStatus.ABSENT) {
    if (!member || !attendanceDate) {
      return <DataTable columns={absentAttendanceColumns} data={[]} />;
    }
  
    const formattedData = member?.filter((d) => {
      return d.attendances[date].status === status;
    });
    
    return (
      <DataTable columns={absentAttendanceColumns} data={formattedData} />
    );
  }

  if (!member || !attendanceDate) {
    return <DataTable columns={attendanceColumns} data={[]} />;
  }

  const formattedData = member?.filter((d) => {
    return d.attendances[date].status === status;
  });
  
  return (
    <DataTable columns={attendanceColumns} data={formattedData} />
  );
}