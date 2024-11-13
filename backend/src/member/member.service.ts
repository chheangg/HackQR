import { Inject, Injectable } from "@nestjs/common";
import { MemberDocument } from "./member.document";
import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { MemberDto } from "./member.dto";
import { AttendanceService } from "src/attendance/attendance.service";
import * as dayjs from 'dayjs'
import { MemberStatus } from "./member-status.enum";
import { MemberAttendance } from "./member-attendance";
import { AttendanceDocument } from "src/attendance/attendance.document";
import { MemberInvalidCheckinException } from "./member-invalid-checkin.exception";

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

  async findMemberById(id: string): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);
    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;
    
    return member;
  }

  async create(id: string): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);
    const attendances = await this.attendanceService.findAll();
    const memberAttendanceList: MemberAttendance[] = attendances.map((a) => ({
      checkIn: Timestamp.fromDate(new Date(Date.now())),
      status: MemberStatus.ABSENT
    }))

    const memberAttendance: { [key: string]: MemberAttendance } = 
      memberAttendanceList.reduce((acc,curr,i)=> (acc[attendances[i].date]=curr,acc),{})

    await docRef.update({
      attendances: memberAttendance,
    });

    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;
    
    return member;
  }

  async update(id: string, memberDto: MemberDto): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);

    await docRef.update({
      name: memberDto.firstname,
    })

    const memberDoc = await docRef.get();

    const member = memberDoc.data();
    member.id = memberDoc.id;
    
    return member;
  }

  async moveStatus(id: string, date: string): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);
    const memberDoc = await docRef.get();
    const member = memberDoc.data();

    const attendance = await this.attendanceService.findDateByDateOrThrowError(date);
    const checkIn = Date.now();

    if (member.attendances[attendance.date] 
      && 
      (
        member.attendances[attendance.date].status === MemberStatus.PRESENT
        ||
        member.attendances[attendance.date].status === MemberStatus.LATE
      )
      ) {
      return member;
    }

    const startTimestamp = attendance.timeStart.toDate();
    const lateTimestamp = attendance.timeLate.toDate();
    const endTimestamp = attendance.timeEnd.toDate();
    const checkInTimestamp = dayjs(checkIn);

    if (checkInTimestamp.isAfter(endTimestamp)) {
      throw new MemberInvalidCheckinException(
        `Attempting to check-in member with id (${id}) after the end date of event date ${date}`
      )
    }

    if (checkInTimestamp.isAfter(startTimestamp) && checkInTimestamp.isBefore(lateTimestamp)) {
      await this.changeStatus(id, member,attendance, MemberStatus.PRESENT);
      return (await docRef.get()).data();
    }

    if (checkInTimestamp.isAfter(startTimestamp) && checkInTimestamp.isAfter(lateTimestamp)) {
      await this.changeStatus(id, member, attendance, MemberStatus.LATE);
      return (await docRef.get()).data();
    }

    throw new MemberInvalidCheckinException(
      `Attempting to check-in member with id (${id}) before the start date of event date ${date}`
    )

  }

  async changeStatus(
    id: string, 
    member: MemberDocument, 
    attendance: AttendanceDocument, 
    status: MemberStatus): Promise<void> {
    const docRef = this.membersCollection.doc(id);

    await docRef.update({
      attendances: {
        ...member.attendances,
        [attendance.date]: {
          checkIn: Timestamp.fromDate(dayjs(Date.now()).toDate()),
          status
        }
      }
    });
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
      firstname: member.firstname,
      email: member.email,
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