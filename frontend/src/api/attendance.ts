
import { request } from "../lib/request";
import { Attendance } from "../features/Attendance/types/Attendance";

export const getAllAttendances = (): Promise<Attendance[]> => 
  request({
    url: '/attendances',
    method: 'GET'
  });

export const getAttendanceByDate = (date: string): Promise<Attendance> =>
  request({
    url: '/attendances/' + date,
    method: 'GET'
  });

export const createAttendance = (attendanceDto: Attendance) : Promise<Attendance> =>
  request({
    url: '/attendances',
    method: 'POST',
    data: attendanceDto
  });

export const updateAttendance = (attendanceDto: Attendance) : Promise<Attendance> =>
  request({
    url: '/attendances',
    method: 'PATCH',
    data: attendanceDto
  });