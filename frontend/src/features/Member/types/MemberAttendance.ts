import { MemberStatus } from "./MemberStatus";

export type MemberAttendance = {
  date: String;
  checkIn: Date;
  memberStatus: MemberStatus;
}