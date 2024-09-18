import { Timestamp } from "@google-cloud/firestore";

export class AttendanceDocument {
  static collectionName = 'attendances';
  
  date: string;
  timeStart: Timestamp;
  timeEnd: Timestamp;
  timeLate: Timestamp;
}