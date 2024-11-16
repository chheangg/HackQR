import { IsArray, IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { MemberAttendanceDto } from "./member-attendance.dto";
import { Type } from "class-transformer";

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  firstname: string;

  @IsString()
  email: string;

  @IsBoolean()
  approved: boolean;

  attendances: {
    [date: string]: MemberAttendanceDto
  }
}