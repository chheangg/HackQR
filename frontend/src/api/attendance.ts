
import { request } from "../lib/request"
import { Attendance } from "../features/Attendance/types/Attendance"

export const getAllAttendances = (): Promise<Attendance[]> => 
  request({
    url: '/attendances',
    method: 'GET',
  })
