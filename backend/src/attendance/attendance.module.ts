import { Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { FirebaseAdmin } from "src/firebase-setup";

@Module({
  controllers: [AttendanceController],
  providers: [AttendanceService, FirebaseAdmin],
  exports: [AttendanceService]
})
export class AttendanceModule {}