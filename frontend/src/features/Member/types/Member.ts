import { MemberAttendance } from "./MemberAttendance";

export interface Member {
  id: string;
  name: string;
  attendances: Record<string, MemberAttendance>
  date?: string;
}