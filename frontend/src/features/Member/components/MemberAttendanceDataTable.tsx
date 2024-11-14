import { useQueries } from "@tanstack/react-query";
import { MemberStatus } from "../types/MemberStatus";
import { getAllMembers } from "../api/member";
import { useContext, useEffect, useState } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";
import { absentAttendanceColumns } from "./absentAttendanceColumns";
import { DataTable } from "../../../components/ui/data-table";
import { getAttendanceByDate } from "../../../api/attendance";
import { attendanceColumns } from "./attendanceColumns";
import { Input } from "../../../components/ui/input";

interface MemberAttendanceDataTableProps {
  status?: MemberStatus,
}

export function MemberAttendanceDataTable({ status }: MemberAttendanceDataTableProps) {
  const { date } = useContext(MemberTableContext);
  const [q, setQ] = useState<string>();

  const results = useQueries({
    queries: [
      {
        queryKey: ['attendances'],
        queryFn: async () => await getAttendanceByDate(date),
        staleTime: Infinity
      },
      {
        queryKey: ['members-' + status + '-' + date],
        queryFn: async () => await getAllMembers({ status, date, q }),
        staleTime: Infinity
      }
    ]
  });

  const { isError: isErrorAttendance, isLoading: isLoadingAttendance, data: attendanceDate } = results[0];
  const { isError: isErrorMember, isLoading: isLoadingMember, data: member, refetch: refetchMembers } = results[1];

  useEffect(() => {
    refetchMembers();  // Refetch members when `q` changes
  }, [q, refetchMembers, results]);


  if (isErrorMember || isErrorAttendance) {
    return "Error";
  }

  if (isLoadingMember || isLoadingAttendance) {
    return "Loading";
  }

  function onEnter(e: React.KeyboardEvent<HTMLInputElement>) { 
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      setQ(e.target.value || undefined);
    }
  }

  if (status === MemberStatus.ABSENT) {
    if (!member || !attendanceDate) {
      return (
        <>
          <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
          <DataTable columns={absentAttendanceColumns} data={[]} />
        </>
      );
    }
  
    const formattedData = member?.filter((d) => {
      return d.attendances[date].status === status;
    });
    
    return (
      <>
        <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
        <DataTable columns={absentAttendanceColumns} data={formattedData} />
      </>
    );
  }

  if (!member || !attendanceDate) {
    return (
      <>
        <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
        <DataTable columns={attendanceColumns} data={[]} />
      </>
    );
  }

  const formattedData = member?.filter((d) => {
    return d.attendances[date].status === status;
  });
  
  return (
    <>
      <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
      <DataTable columns={attendanceColumns} data={formattedData} />
    </>
  );
}