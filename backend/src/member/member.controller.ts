import { Body, Controller, Get, Post } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
  ) {}

  @Get()
  async findAllMembers(): Promise<MemberDocument[]> {
    return this.memberService.convertToMemberDtos(
      await this.memberService.findAll()
    );
  }

  @Post()
  async createMember(
    @Body() memberDto: MemberDto
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.create(memberDto)
    );
  }
}