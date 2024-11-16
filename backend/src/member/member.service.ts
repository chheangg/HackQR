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
import { ApplicationDocument } from "./application.document";

interface MemberQuery {
  date?: string;
  status?: MemberStatus | '' | null;
  q?: string;
}

@Injectable()
export class MemberService {
  constructor(
    @Inject(MemberDocument.collectionName)
    private membersCollection: CollectionReference<MemberDocument>,
    @Inject(ApplicationDocument.collectionName)
    private applicationsCollection: CollectionReference<ApplicationDocument>,
    private attendanceService: AttendanceService,
  ) {}

  async findAllApprovedApplications(): Promise<ApplicationDocument[]> {
    const snapshot: 
    FirebaseFirestore.QuerySnapshot<ApplicationDocument, FirebaseFirestore.DocumentData>
    = await this.applicationsCollection.get()
    
    const applications: ApplicationDocument[] = [];

    snapshot.forEach(doc => {
      const application = doc.data()
      application.id = doc.id;
      applications.push(application)
    });

    return applications;
  }

  async findAll({ date, status, q }: MemberQuery): Promise<MemberDocument[]> {
    let snapshot: FirebaseFirestore.QuerySnapshot<MemberDocument, FirebaseFirestore.DocumentData>;
    if (date && status && q) {
      snapshot = await this.membersCollection
      .where('attendances.' + date + '.status', '==', status).get()

      const members: MemberDocument[] = [];

      snapshot.forEach(doc => {
        const member = doc.data()
        member.id = doc.id;

        console.log(members)

        if (!member.approved) {
          return;
        }
        
        if (member.firstname) {
          if(member.attendances[date] && member.attendances[date].status === status && (member.firstname.includes(q) || member.email.includes(q))) {
            members.push(member)
          }
        }
      });
  
      return members; 
    } else if (date && status) {
      snapshot = await this.membersCollection
      .where('attendances.' + date + '.status', '==', status).get()
    } else if (q) {
      snapshot = await this.membersCollection.get();

      const members: MemberDocument[] = [];

      snapshot.forEach(doc => {
        const member = doc.data()
        member.id = doc.id;

        if (!member.approved) {
          return;
        }

        if (member.firstname) {
          if (member.firstname.includes(q) || member.email.includes(q)) {
            members.push(member)
          }
        }
      });

      return members;
    } else {
      snapshot = await this.membersCollection.get();
    }


    const members: MemberDocument[] = [];

    snapshot.forEach(doc => {
      const member = doc.data()

      if (!member.approved) {
        return;
      }

      member.id = doc.id;
      members.push(member)
    });

    return members; 
  }

  async findMemberById(id: string): Promise<MemberDocument> {
    const docRef = this.membersCollection.doc(id);
    const memberDoc = await docRef.get();

    const member = memberDoc.data();

    if (!member.approved) {
      return;
    }

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
      approved: memberDto.approved
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
      console.log('ATTEMPTED CHECK-IN MEMBER AFTER: ', member)
      console.log('CHECK-IN TIME: ', checkInTimestamp)
      throw new MemberInvalidCheckinException(
        `Attempting to check-in member with id (${id}) after the end date of event date ${date}`
      )
    }

    if (checkInTimestamp.isAfter(startTimestamp) && checkInTimestamp.isBefore(lateTimestamp)) {
      console.log('MEMBER IS PRESENT: ', member)
      console.log('CHECK-IN TIME: ', checkInTimestamp)
      await this.changeStatus(id, member,attendance, MemberStatus.PRESENT);
      return (await docRef.get()).data();
    }

    if (checkInTimestamp.isAfter(startTimestamp) && checkInTimestamp.isAfter(lateTimestamp)) {
      console.log('MEMBER IS LATE: ', member)
      console.log('CHECK-IN TIME: ', checkInTimestamp)
      await this.changeStatus(id, member, attendance, MemberStatus.LATE);
      return (await docRef.get()).data();
    }

    console.log('ATTEMPTED CHECK-IN MEMBER BEFORE: ', member)
    console.log('CHECK-IN TIME: ', checkInTimestamp)

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

  async migrateApprovedField(): Promise<MemberDocument[]> {
    const applications = await this.findAllApprovedApplications();
    const members = await this.findAll({});

    const applicationMemberMap: { [key: string]: boolean } = {};
    applications.forEach((a) => {
      applicationMemberMap[a.id] = a.approved || false;
    })

    const approvedMembersList = members.map((m) => ({
      ...m,
      approved: applicationMemberMap[m.id] || false,
    }))

    approvedMembersList.forEach(async (m) => {
      await this.update(m.id, this.convertToMemberDto(m))
    })
    
    return approvedMembersList
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
      approved: member.approved,
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