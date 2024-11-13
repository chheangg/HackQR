import { MemberAttendance } from "./MemberAttendance";

export interface Member {
  id: string;
  firstname: string;
  email: string;
  attendances: Record<string, MemberAttendance>
  date?: string;
}