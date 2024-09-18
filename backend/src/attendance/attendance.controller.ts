import { Body, Controller, Get, Post } from "@nestjs/common";
import { AttendanceDto } from "./attendance.dto";
import { AttendanceService } from "./attendance.service";

@Controller('attendances')
export class AttendanceController {
  constructor(
    private attendanceService: AttendanceService,
  ) {}

  @Get()
  async findAllAttendances(): Promise<AttendanceDto[]> {
    return this.attendanceService.convertToAttendanceDtos(
      await this.attendanceService.findAll()
    );
  }

  @Post()
  async createAttendance(
    @Body() attendanceDto: AttendanceDto
  ): Promise<AttendanceDto> {
    return this.attendanceService.convertToAttendanceDto(
      await this.attendanceService.create(attendanceDto)
    )
  }
}