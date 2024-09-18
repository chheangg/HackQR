import { DataTable } from "../../../components/ui/data-table";
import { Attendance } from "../types/Attendance";
import { columns } from "./columns";

export function AttendanceDataTable() {
  const data: Attendance[] = [
    {
      date: "2024/09/19",
      timeStart: new Date("2024-09-19T07:00:00.000Z"),
      timeLate: new Date("2024-09-19T19:00:00.000Z"),
      timeEnd: new Date("2024-09-20T06:59:59.000Z")
    },
    {
      date: "2024/09/20",
      timeStart: new Date("2024-09-20T07:00:00.000Z"),
      timeLate: new Date("2024-09-20T19:00:00.000Z"),
      timeEnd: new Date("2024-09-21T06:59:59.000Z")
    }
  ]

  return (
    <DataTable columns={columns} data={data} />
  )
}