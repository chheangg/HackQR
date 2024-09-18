import { Module } from "@nestjs/common";
import { MemberService } from "./member.service";
import { MemberController } from "./member.controller";
import { AttendanceService } from "src/attendance/attendance.service";
import { AttendanceModule } from "src/attendance/attendance.module";

@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [AttendanceModule],
})
export class MemberModule {}