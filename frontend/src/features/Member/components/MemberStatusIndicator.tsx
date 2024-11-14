import { Row } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { MemberAttendance } from "../types/MemberAttendance";
import { useContext } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";
import { MemberStatus } from "../types/MemberStatus";
import { cn } from "../../../lib/utils";

interface MemberStatusProps {
  row: Row<Member>;
}

export function MemberStatusIndicator({ row }: MemberStatusProps) {
  const { date } = useContext(MemberTableContext);
  const attendances: Record<string, MemberAttendance> = row.original.attendances;
  const status = attendances[date].status;
  return (
    <span 
      className={cn([
        'rounded-full p-2 font-medium text-sm text-background',
        status === MemberStatus.ABSENT && 'bg-red-500',
        status === MemberStatus.LATE && 'bg-amber-500',
        status === MemberStatus.PRESENT && 'bg-green-500'
      ])}
    >
      {status}
    </span>
  );
}