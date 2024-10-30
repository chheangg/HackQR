import { getAllMembers } from "../api/member";
import { DataTable } from "../../../components/ui/data-table";
import { memberColumns } from "./memberColumns";
import { useQuery } from "@tanstack/react-query";


export function MemberDataTable() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getAllMembers({}),
    staleTime: Infinity
  });

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  if (!data) {
    return <DataTable columns={memberColumns} data={[]} />;
  }
  
  return (
    <DataTable columns={memberColumns} data={data} />
  );
}