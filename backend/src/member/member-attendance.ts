import { Timestamp } from "@google-cloud/firestore";
import { MemberStatus } from "./member-status.enum";

export class MemberAttendance {
  checkIn: Timestamp;
  status: MemberStatus;
}