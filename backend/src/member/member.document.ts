import { MemberAttendance } from "./member-attendance";
import { MemberStatus } from "./member-status.enum";

export class MemberDocument {
  static collectionName = 'logins';
  
  id?: string;
  firstname: string;
  email: string;
  attendances?: {
    [date: string]: MemberAttendance
  }
}