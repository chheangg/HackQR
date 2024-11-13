import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { MemberStatus } from "./MemberStatus";

export const attendanceColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'firstname',
    header: 'First Name'
  },
  {
    header: 'status',
    cell: ({ row }) => (
      <MemberStatus row={row} />
    )
  }
];