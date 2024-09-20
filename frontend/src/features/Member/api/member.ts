
import { request } from "../../../lib/request";
import { Member } from "../types/Member";
import { MemberStatus } from "../types/MemberStatus";

interface memberQueryOptions {
  status?: MemberStatus,
  date?: string,
}

export const getAllMembers = (q: memberQueryOptions): Promise<Member[]> => 
  request({
    url: '/members',
    method: 'GET',
    params: q,
  })
