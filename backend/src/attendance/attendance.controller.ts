import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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

  @Get(':date')
  async findAllAttendanceByDate(@Param('date') date: string): Promise<AttendanceDto> {
    return this.attendanceService.convertToAttendanceDto(
      await this.attendanceService.findDateByDateOrThrowError(date)
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

  @Put(":id")
  async updateAttendance(
    @Param('id') id: string,
    @Body() attendanceDto: AttendanceDto
  ): Promise<AttendanceDto> {
    return this.attendanceService.convertToAttendanceDto(
      await this.attendanceService.update(id, attendanceDto)
    );
  }

  @Delete(":id")
  async deleteAttendance(
    @Param('id') id: string,
  ): Promise<AttendanceDto> {
    return this.attendanceService.convertToAttendanceDto(
      await this.attendanceService.delete(id)
    );
  }
}