import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";
import { MemberStatus } from "./member-status.enum";
import { FirebaseGuard } from "@alpha018/nestjs-firebase-auth";
import { Auth } from "src/auth/auth.decorator";

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
  ) {}

  @Get()
  @Auth()
  async findAllMembers(
    @Query('date') date: string,
    @Query('status') status: MemberStatus | '' | null
  ): Promise<MemberDto[]> {
    return this.memberService.convertToMemberDtos(
      await this.memberService.findAll({ date, status })
    );
  }

  @Get(':id')
  async findMemberById(
    @Param('id') id: string
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.findMemberById(id)
    )
  }

  @Post(':id')
  @Auth()
  async createMember(
    @Param('id') id: string,
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.create(id)
    );
  }

  @Put(":id")
  @Auth()
  async updateMember(
    @Param('id') id: string,
    @Body() memberDto: MemberDto
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.update(id, memberDto)
    );
  }

  @Put(":id/move-status/:date")
  @Auth()
  async moveMemberStatus(
    @Param('id') id: string,
    @Param('date') date: string,
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.moveStatus(id, date)
    );
  }

  @Delete(":id")
  @Auth()
  async deleteMember(
    @Param('id') id: string
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.delete(id)
    );
  }
}