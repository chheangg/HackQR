import { ColumnDef } from "@tanstack/react-table";
import { Attendance } from "../types/Attendance";
import { default as dayjs } from 'dayjs';

function formatDate(date: Date) {
  return dayjs(date).format('MMMM D, YYYY h:mm A');
}

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "date",
    header: "Event Date"
  },
  {
    accessorKey: "timeStart",
    header: "Time Start",
    cell: ({ row }) => formatDate(row.getValue('timeStart'))
  },
  {
    accessorKey: "timeLate",
    header: "Time Late",
    cell: ({ row }) => formatDate(row.getValue('timeLate'))
  },
  {
    accessorKey: "timeEnd",
    header: "Time End",
    cell: ({ row }) => formatDate(row.getValue('timeEnd'))
  }
];