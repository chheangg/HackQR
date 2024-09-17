import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MemberStatus } from "./member-status.enum";

export class MemberDto {
  @IsString()
  id: String;

  @IsString()
  @IsNotEmpty()
  name: String;

  @IsEnum(MemberStatus)
  @IsNotEmpty()
  status: MemberStatus;
}