import { Inject, Injectable } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { CollectionReference } from "@google-cloud/firestore";

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberDocument.collectionName)
    private membersCollection: CollectionReference<MemberDocument>,
  ) {}

  async findAll(): Promise<MemberDocument[]> {
    const snapshot = await this.membersCollection.get();
    const members: MemberDocument[] = [];
    snapshot.forEach(doc => members.push(doc.data()));
    return members; 
  }
}