import { IsNotEmpty, IsString } from "class-validator";
import { MemberAttendanceDto } from "./member-attendance.dto";
import { Type } from "class-transformer";

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  attendances: {
    [date: string]: MemberAttendanceDto
  }
}