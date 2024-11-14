
import { request } from "../../../lib/request";
import { Member } from "../types/Member";
import { MemberStatus } from "../types/MemberStatus";

interface memberQueryOptions {
  status?: MemberStatus,
  date?: string,
  q?: string,
}

export const getAllMembers = (q: memberQueryOptions): Promise<Member[]> => 
  request({
    url: '/members',
    method: 'GET',
    params: q
  });


export const moveMemberStatus = (id: string, date: string): Promise<Member> =>
  request({
    url: `/members/${id}/move-status/${date}`,
    method: 'PUT'
  });

export const changeMemberStatus = (id: string, date: string, status: MemberStatus): Promise<Member> =>
  request({
    url: `/members/${id}/change-status/${date}?status=${status}`,
    method: 'PUT'
  });