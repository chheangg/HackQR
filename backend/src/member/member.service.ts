import { Inject, Injectable } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { CollectionReference } from "@google-cloud/firestore";
import { MemberDto } from "./member.dto";
import { v4 as uuidv4 } from 'uuid';
import { FirebaseFirestoreError } from "firebase-admin/lib/utils/error";

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
      const member = doc.data()
      member.id = doc.id;
      members.push(member)
    });

    return members; 
  }

  async create(memberDto: MemberDto): Promise<MemberDocument> {
    const memberId = uuidv4();

    const docRef = this.membersCollection.doc(memberId);
    await docRef.set({
      name: memberDto.name,
    });

    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;
    
    return member;
  }

  async update(id: string, memberDto: MemberDto): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);

    await docRef.update({
      name: memberDto.name,
    })

    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;
    
    return member;
  }

  async delete(id: string): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);

    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;

    await docRef.delete();

    return member;
  }

  convertToMemberDto(member: MemberDocument): MemberDto {
    return {
      id: member.id,
      name: member.name,
    }
  }

  convertToMemberDtos(members: MemberDocument[]): MemberDto[] {
    return members.map(member => this.convertToMemberDto(member))
  }
}