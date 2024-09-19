import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";

export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'id',
    header: 'Member ID'
  },
  {
    accessorKey: 'name',
    header: 'Name'
  },
]