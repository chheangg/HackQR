import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Member } from "../types/Member";
import QRCode from 'react-qr-code';
import { MemberAttendance } from "../types/MemberAttendance";
import { moveMemberStatus } from "../api/member";
import { MemberStatus } from "../types/MemberStatus";
import { default as dayjs } from 'dayjs';
import { getAllAttendances } from "../../../api/attendance";
import { useNavigate } from "@tanstack/react-router";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['attendance-member-detail'],
    queryFn: () => getAllAttendances()
  });

  const memberStatusMutation = useMutation({
    mutationFn: (memberAttendance: MemberAttendance) => moveMemberStatus(member.id, memberAttendance)
  });

  const navigate = useNavigate();

  function takeAttendance() {
    const todayDate = dayjs().format('YYYY-MM-DD');

    if (!data) return;

    const isToday = data.find((a) => todayDate === a.date);

    if (!isToday) return;
    
    
    const memberAttendance: MemberAttendance = {
      checkIn: dayjs().toDate(),
      status: MemberStatus.PRESENT,
      date: isToday.date
    };
    
    memberStatusMutation.mutate(memberAttendance);
    navigate({ to: '/members' });
  }

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  return (
    <>
      <div className="flex flex-row-reverse mb-4 font-body">
        <Button onClick={takeAttendance} className="bg-green-500">
          Take Attendance
        </Button>
      </div>
      <Card className="w-full font-body">
        <CardHeader className="w-full">
          <p>
          👋 Hey there, <span className="font-bold">{member.name}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-2 p-4 border border-border rounded-xl">
            <QRCode value={member.id} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}