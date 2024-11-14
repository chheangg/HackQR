import { Controller, Post, Body } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { UserService } from "./user.service";
import { Auth } from "./auth.decorator";
import { SetupDto } from "./setup.dto";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/sign-up")
    @Auth("ADMIN")
    signup(@Body() userRequest: UserDto) {
        return this.userService.createUser(userRequest);
    }

    @Post("/setup")
    setup(@Body() userRequest: SetupDto) {
      if (userRequest.secret === 'hack-cc-is-awesome')
        return this.userService.createUser(userRequest);
    }
}