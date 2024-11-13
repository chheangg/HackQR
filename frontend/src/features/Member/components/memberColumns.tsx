import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'email',
    header: 'Email'
  },
  {
    accessorKey: 'firstname',
    header: 'First Name'
  }
];