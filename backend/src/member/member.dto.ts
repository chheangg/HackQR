import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { MemberAttendanceDto } from "./member-attendance.dto";
import { Type } from "class-transformer";

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  firstname: string;

  @IsString()
  email: string;

  attendances: {
    [date: string]: MemberAttendanceDto
  }
}