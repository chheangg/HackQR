import { Inject, Injectable } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { MemberDto } from "./member.dto";
import { v4 as uuidv4 } from 'uuid';
import { MemberAttendanceDto } from "./member-attendance.dto";
import { AttendanceService } from "src/attendance/attendance.service";
import * as dayjs from 'dayjs'
import { MemberStatus } from "./member-status.enum";

interface MemberQuery {
  date?: string;
  status?: MemberStatus | '' | null;
}

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberDocument.collectionName)
    private membersCollection: CollectionReference<MemberDocument>,
    private attendanceService: AttendanceService,
  ) {}

  async findAll({ date, status }: MemberQuery): Promise<MemberDocument[]> {
    let snapshot: FirebaseFirestore.QuerySnapshot<MemberDocument, FirebaseFirestore.DocumentData>;
    if (date && status) {
      snapshot = await this.membersCollection
      .where('attendances.' + date + '.status', '==', status).get()
    } else {
      snapshot = await this.membersCollection.get();
    }
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

  async moveStatus(id: string, memberAttendanceDto: MemberAttendanceDto): Promise<MemberDocument> {
    const attendance = await this.attendanceService.findDateByDateOrThrowError(memberAttendanceDto.date);

    const docRef = this.membersCollection.doc(id);

    // TODO: Fix this, it's redundant
    let memberDoc = await docRef.get();

    let member = memberDoc.data();

    await docRef.update({
      attendances: {
        ...member.attendances,
        [attendance.date]: {
          checkIn: Timestamp.fromDate(dayjs(Date.now()).toDate()),
          status: memberAttendanceDto.status
        }
      }
    })

    memberDoc = await docRef.get();

    member = memberDoc.data();
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
    const memberDto = {
      id: member.id,
      name: member.name,
      attendances: {},
    };

    Object.keys(member.attendances || {}).forEach((key) => {
      memberDto.attendances[key] = {
        checkIn: member.attendances[key].checkIn.toDate().toISOString(),
        status: member.attendances[key].status
      }
    })

    return memberDto;
  }

  convertToMemberDtos(members: MemberDocument[]): MemberDto[] {
    return members.map(member => this.convertToMemberDto(member))
  }
}