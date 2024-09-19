
import { request } from "../../../lib/request";
import { Member } from "../types/Member";

export const getAllMembers = (): Promise<Member[]> => 
  request({
    url: '/members',
    method: 'GET',
  })
