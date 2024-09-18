import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { IsOnlyDateString } from "src/validator/IsOnlyDateString";

export class AttendanceDto {
  @IsOnlyDateString()
  @IsNotEmpty()
  date: string;

  @IsDateString()
  @IsNotEmpty()
  timeStart: string;

  @IsDateString()
  @IsNotEmpty()
  timeEnd: string;

  @IsDateString()
  @IsNotEmpty()
  timeLate: string;
}