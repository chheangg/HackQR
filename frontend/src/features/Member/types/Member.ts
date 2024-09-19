import { MemberAttendance } from "./MemberAttendance";

export type Member = {
  id: string;
  name: string;
  attendances: {
    [key: string]: MemberAttendance;
  }
};