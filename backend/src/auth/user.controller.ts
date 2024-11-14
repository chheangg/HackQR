import { Controller, Post, Body } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
import { Auth } from "./auth.decorator";
import { SetupDto } from "./setup.dto";
import { ConfigService } from "@nestjs/config";

@Controller("users")
export class UserController {
    constructor(
      private readonly userService: UserService,
      private readonly configService: ConfigService
    ) {}

    @Post("/sign-up")
    @Auth("ADMIN")
    signup(@Body() userRequest: UserDto) {
        return this.userService.createUser(userRequest);
    }

    @Post("/setup")
    setup(@Body() userRequest: SetupDto) {
      console.log(this.configService.get('secret'), 'hey')
      if (userRequest.secret === this.configService.get<string>('SECRET'))
        return this.userService.createUser(userRequest);
    }
}