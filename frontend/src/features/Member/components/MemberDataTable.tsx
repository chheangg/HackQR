import { getAllMembers } from "../api/member";
import { DataTable } from "../../../components/ui/data-table";
import { memberColumns } from "./memberColumns";
import { useQuery } from "@tanstack/react-query";
import { Input } from "../../../components/ui/input";
import { useEffect, useState } from "react";


export function MemberDataTable() {
  const [q, setQ] = useState<string>();
  const { isLoading, isError, data, refetch: refetchMembers } = useQuery({
    queryKey: ['members'],
    queryFn: async () => await getAllMembers({ q }),
    staleTime: Infinity
  });

  useEffect(() => {
    refetchMembers();  // Refetch members when `q` changes
  }, [q, refetchMembers]);

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  function onEnter(e: React.KeyboardEvent<HTMLInputElement>) { 
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      setQ(e.target.value || undefined);
    }
  }

  if (!data) {
    return (
      <>
        <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
        <DataTable columns={memberColumns} data={[]} />
      </>
    );
  }
  
  return (
    <>
      <Input onKeyDown={(e) => onEnter(e)} className="mb-4" placeholder="Search for Hackers" />
      <DataTable columns={memberColumns} data={data} />
    </>
  );
}