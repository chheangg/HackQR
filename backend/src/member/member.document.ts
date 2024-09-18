import { MemberStatus } from "./member-status.enum";

export class MemberDocument {
  static collectionName = 'members';
  
  id?: string;
  name: string;
}