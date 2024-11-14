import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { MemberService } from "./member.service";
import { MemberDto } from "./member.dto";
import { MemberStatus } from "./member-status.enum";
import { FirebaseGuard } from "@alpha018/nestjs-firebase-auth";
import { Auth } from "src/auth/auth.decorator";
import { AttendanceService } from "src/attendance/attendance.service";

@Controller('members')
export class MemberController {
  constructor(
    private memberService: MemberService,
    private attendanceService: AttendanceService,
  ) {}

  @Get()
  @Auth("ORGANIZER", "ADMIN")
  async findAllMembers(
    @Query('date') date: string,
    @Query('status') status: MemberStatus | '' | null,
    @Query('q') q: string,
  ): Promise<MemberDto[]> {
    return this.memberService.convertToMemberDtos(
      await this.memberService.findAll({ date, status, q })
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
  @Auth("ADMIN")
  async createMember(
    @Param('id') id: string,
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.create(id)
    );
  }

  @Put(":id")
  @Auth("ADMIN")
  async updateMember(
    @Param('id') id: string,
    @Body() memberDto: MemberDto
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.update(id, memberDto)
    );
  }

  @Put(":id/move-status/:date")
  @Auth("ORGANIZER", "ADMIN")
  async moveMemberStatus(
    @Param('id') id: string,
    @Param('date') date: string,
  ): Promise<MemberDto> {
    return this.memberService.convertToMemberDto(
      await this.memberService.moveStatus(id, date)
    );
  }

  @Put(":id/change-status/:date")
  @Auth("ADMIN")
  async changeMemberStatus(
    @Param('id') id: string,
    @Param('date') date: string,
    @Query('status') status: MemberStatus,
  ): Promise<MemberDto> {
    const member = await this.memberService.findMemberById(id);
    const attendance = await this.attendanceService.findDateByDateOrThrowError(date);
    await this.memberService.changeStatus(id, member, attendance, status)
    return this.memberService.convertToMemberDto(
      await this.memberService.findMemberById(id)
    );
  }

  @Delete(":id")
  @Auth("ADMIN")
  async deleteMember(
    @Param('id') id: string
  ) {
    return this.memberService.convertToMemberDto(
      await this.memberService.delete(id)
    );
  }
}