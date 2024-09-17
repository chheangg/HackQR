import { Inject, Injectable } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { CollectionReference } from "@google-cloud/firestore";
import { MemberDto } from "./member.dto";

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberDocument.collectionName)
    private membersCollection: CollectionReference<MemberDocument>,
  ) {}

  async findAll(): Promise<MemberDocument[]> {
    const snapshot = await this.membersCollection.get();
    const members: MemberDocument[] = [];

    snapshot.forEach(doc => {
      const memberDocument = doc.data()
      memberDocument.id = doc.id;
      members.push(memberDocument)
    });

    return members; 
  }

  convertToMemberDto(member: MemberDocument): MemberDto {
    return {
      id: member.id,
      name: member.name,
      status: member.status,
    }
  }

  convertToMemberDtos(members: MemberDocument[]): MemberDto[] {
    return members.map(member => this.convertToMemberDto(member))
  }
}