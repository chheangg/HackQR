import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";
import { MemberAttendanceDto } from "./member-attendance.dto";
import { MemberStatus } from "./member-status.enum";

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
  ) {}

  @Get()
  async findAllMembers(
    @Query('date') date: string,
    @Query('status') status: MemberStatus | '' | null
  ): Promise<MemberDto[]> {
    return this.memberService.convertToMemberDtos(
      await this.memberService.findAll({ date, status })
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

  @Put(":id/move-status")
  async moveMemberStatus(
    @Param('id') id: string,
    @Body() MemberAttendanceDto
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.moveStatus(id, MemberAttendanceDto)
    );
  }

  @Delete(":id")
  async deleteMember(
    @Param('id') id: string
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.delete(id)
    );
  }
}