import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { MemberStatus } from "./MemberStatus";

export const attendanceColumns: ColumnDef<Member>[] = [
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
    cell: ({ row }) => (
      <MemberStatus row={row} />
    )
  }
];