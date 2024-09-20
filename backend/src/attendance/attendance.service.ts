import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AttendanceDocument } from "./attendance.document";
import { CollectionReference, Timestamp } from "@google-cloud/firestore";
import { AttendanceDto } from "./attendance.dto";
import { MemberDocument } from "src/member/member.document";
import { MemberAttendance } from "src/member/member-attendance";
import { MemberStatus } from "src/member/member-status.enum";

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(AttendanceDocument.collectionName)
    private attendancesCollection: CollectionReference<AttendanceDocument>,
    @Inject(MemberDocument.collectionName)
    private membersCollection: CollectionReference<MemberDocument>,
  ) {}

  async findAll(): Promise<AttendanceDocument[]> {
    const snapshot = await this.attendancesCollection.get();
    const attendances: AttendanceDocument[] = [];

    snapshot.forEach(doc => {
      const attendance = doc.data();
      attendances.push(attendance);
    })

    return attendances;
  }

  async findDateByDateOrThrowError(date: string): Promise<AttendanceDocument> {
    const docRef = this.attendancesCollection.doc(date);
    
    const attendanceDoc = await docRef.get();

    if (!attendanceDoc.data()) {
      throw new NotFoundException(AttendanceDocument);
    }

    return attendanceDoc.data();
  }

  async create(attendanceDto: AttendanceDto): Promise<AttendanceDocument> {
    const docRef = this.attendancesCollection.doc(attendanceDto.date);

    await docRef.set({
      date: attendanceDto.date,
      timeStart: Timestamp.fromDate(
        new Date(attendanceDto.timeStart)
      ),
      timeEnd: Timestamp.fromDate(
        new Date(attendanceDto.timeEnd)
      ),
      timeLate: Timestamp.fromDate(
        new Date(attendanceDto.timeLate)
      )
    });

    const attendanceDoc = await docRef.get();
    const attendance = attendanceDoc.data();

    const allMembers = await this.membersCollection.get()

    allMembers.docs.forEach(async (doc) => {
      const memberAttendance: MemberAttendance = {
        checkIn: Timestamp.fromDate(new Date(Date.now())),
        status: MemberStatus.NOT_YET_ARRIVED,
      };

      const memberRef = await doc.ref.get();
      const member = memberRef.data();

      doc.ref.update({
        attendances: {
          ...member.attendances,
          [attendance.date]: memberAttendance,
        }
      })
    })

    return attendance;
  }

  async update(id: string, attendanceDto: AttendanceDto): Promise<AttendanceDocument> {
    const docRef = this.attendancesCollection.doc(id);

    await docRef.update({
      timeStart: Timestamp.fromDate(
        new Date(attendanceDto.timeStart)
      ),
      timeEnd: Timestamp.fromDate(
        new Date(attendanceDto.timeEnd)
      ),
      timeLate: Timestamp.fromDate(
        new Date(attendanceDto.timeLate)
      )
    })

    const attendanceDoc = await docRef.get();
    return attendanceDoc.data();
  }

  async delete(id: string): Promise<AttendanceDocument> {
    const docRef = this.attendancesCollection.doc(id);

    const attendanceDoc = await docRef.get();

    await docRef.delete();

    return attendanceDoc.data();
  }

  convertToAttendanceDto(attendance: AttendanceDocument): AttendanceDto {
    return {
      date: attendance.date,
      timeStart: attendance.timeStart.toDate().toISOString(),
      timeEnd: attendance.timeEnd.toDate().toISOString(),
      timeLate: attendance.timeLate.toDate().toISOString(),
    }
  }

  convertToAttendanceDtos(attendances: AttendanceDocument[]): AttendanceDto[] {
    return attendances.map(attendance => this.convertToAttendanceDto(attendance));
  }
}