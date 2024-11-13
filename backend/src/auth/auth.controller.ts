import { FirebaseUser, FirebaseUserClaims } from "@alpha018/nestjs-firebase-auth";
import { Controller, Get } from "@nestjs/common";
import { auth } from "firebase-admin";

@Controller('auth')
export class AuthController {
  @Get('/user-info')
  getUserInfo(
    @FirebaseUser() user: auth.DecodedIdToken
  ) {
    return { user };
  }
}