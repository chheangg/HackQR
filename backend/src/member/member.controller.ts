import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
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

  @Put(":id")
  async updateMember(
    @Param('id') id: string,
    @Body() memberDto: MemberDto
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.update(id, memberDto)
    );
  }
}