import { Module } from "@nestjs/common";
import { MemberService } from "./member.service";
import { MemberController } from "./member.controller";
import { AttendanceModule } from "src/attendance/attendance.module";
import { FirebaseAdmin } from "src/firebase-setup";

@Module({
  controllers: [MemberController],
  providers: [MemberService, FirebaseAdmin],
  imports: [AttendanceModule],
})
export class MemberModule {}