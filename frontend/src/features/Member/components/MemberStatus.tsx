import { Row } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { MemberAttendance } from "../types/MemberAttendance";
import { useContext } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";

interface MemberStatusProps {
  row: Row<Member>;
}

export function MemberStatus({ row }: MemberStatusProps) {
  const { date } = useContext(MemberTableContext);
  const attendances: Record<string, MemberAttendance> = row.original.attendances;
  return attendances[date].status;
}