import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { MemberAttendance } from "../types/MemberAttendance";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'id',
    header: 'Member ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    header: 'status',
    cell: ({ row }) => {
      const date = String(row.original.date);
      const attendances: { [key: string]: MemberAttendance} = row.original.attendances;
      return attendances[date].status;
    }
  },
]