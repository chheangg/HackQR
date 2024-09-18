import { IsNotEmpty, IsString } from "class-validator";

export class MemberDto {
  @IsString()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}