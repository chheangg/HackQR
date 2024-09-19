
import { request } from "../../../lib/request";
import { Attendance } from "../types/Attendance";

export const getAllAttendances = (): Promise<Attendance[]> => 
  request({
    url: '/attendances',
    method: 'GET',
  })
