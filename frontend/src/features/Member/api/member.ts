
import { request } from "../../../lib/request";
import { Member } from "../types/Member";
import { MemberAttendance } from "../types/MemberAttendance";
import { MemberStatus } from "../types/MemberStatus";

interface memberQueryOptions {
  status?: MemberStatus,
  date?: string,
}

export const getAllMembers = (q: memberQueryOptions): Promise<Member[]> => 
  request({
    url: '/members',
    method: 'GET',
    params: q
  });


export const moveMemberStatus = (id: string, memberAttendance: MemberAttendance): Promise<Member> =>
  request({
    url: `/members/${id}/move-status`,
    method: 'PUT',
    data: memberAttendance
  });