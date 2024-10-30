import { DataTable } from "../../../components/ui/data-table";
import { getAllAttendances } from "../../../api/attendance";
import { columns } from "./columns";
import { useQuery } from '@tanstack/react-query';

export function AttendanceDataTable() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['attendances'],
    queryFn: async () => await getAllAttendances()
  });

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  if (!data) {
    return <DataTable columns={columns} data={[]} />;
  }

  return (
    <DataTable columns={columns} data={data} />
  );
}