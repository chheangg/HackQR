
import { Member } from "../features/Member/types/Member";
import { request } from "../lib/request";

export const getMemberById = (id: string): Promise<Member> => 
  request({
    url: '/members/' + id,
    method: 'GET'
  });
