import { useQuery } from "@tanstack/react-query";
import { MemberStatus } from "../types/MemberStatus";
import { getAllMembers } from "../api/member";
import { useContext } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";
import { columns } from "./columns";
import { DataTable } from "../../../components/ui/data-table";

interface MemberDataTableProps {
  status?: MemberStatus,
}

export function MemberDataTable({ status }: MemberDataTableProps) {
  const { date } = useContext(MemberTableContext)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['members-' + status + '-' + date],
    queryFn: async () => await getAllMembers({ status, date })
  })

  if (isError) {
    return "Error"
  }

  if (isLoading) {
    return "Loading"
  }

  if (!data) {
    return <DataTable columns={columns} data={[]} />
  }

  const formattedData = data?.map((d) => ({
    ...d,
    date
  }))

  return (
    <DataTable columns={columns} data={formattedData} />
  )
}