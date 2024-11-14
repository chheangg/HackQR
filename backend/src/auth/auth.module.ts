import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { FirebaseAdmin } from "src/firebase-setup";

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin]
})
export class AuthModule {}