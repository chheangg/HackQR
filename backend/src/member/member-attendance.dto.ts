import { Timestamp } from "@google-cloud/firestore";
import { MemberStatus } from "./member-status.enum";
import { Type } from "class-transformer";
import { IsDateString, IsEnum } from "class-validator";
import { IsOnlyDateString } from "src/validator/IsOnlyDateString";

export class MemberAttendanceDto {
  @IsOnlyDateString()
  date: string;

  @IsDateString()
  checkIn: string;

  @IsEnum(MemberStatus)
  status: MemberStatus
}