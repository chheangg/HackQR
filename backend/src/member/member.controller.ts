import { Controller, Get } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { MemberService } from "./member.service";

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
  ) {}

  @Get()
  findAllMembers(): Promise<MemberDocument[]> {
    return this.memberService.findAll();
  }
}