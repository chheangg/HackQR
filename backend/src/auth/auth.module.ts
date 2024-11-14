import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { FirebaseAdmin } from "src/firebase-setup";
import { ConfigService } from "@nestjs/config";

@Module({
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin, ConfigService]
})
export class AuthModule {}