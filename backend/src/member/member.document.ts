export class MemberDocument {
  static collectionName = 'members';
  
  id: String;
  name: String;
  status: MemberStatus;
}