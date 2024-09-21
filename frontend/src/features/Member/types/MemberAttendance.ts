import { MemberStatus } from "./MemberStatus";

export interface MemberAttendance {
  date: string;
  checkIn: Date;
  status: MemberStatus;
}