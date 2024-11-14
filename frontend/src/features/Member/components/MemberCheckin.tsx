import { Row } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { useContext } from "react";
import { MemberTableContext } from "../contexts/MemberTableContext";
import dayjs from "dayjs";

interface MemberCheckinProps {
  row: Row<Member>;
}

export function MemberCheckin({ row } : MemberCheckinProps) {
  const member = row.original;
  const { date } = useContext(MemberTableContext);
  return (
    <div>
      {dayjs(member.attendances[date].checkIn).format('hh:mm A')}
    </div>
  );
}