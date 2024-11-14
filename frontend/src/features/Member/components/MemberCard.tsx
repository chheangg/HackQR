import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Member } from "../types/Member";
import QRCode from 'react-qr-code';
import { moveMemberStatus } from "../api/member";
import { default as dayjs } from 'dayjs';
import { getAllAttendances } from "../../../api/attendance";
import { useNavigate } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../Auth/context/AuthContext";
import { cn } from "../../../lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../../components/ui/alert-dialog";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ['attendance-member-detail'],
    queryFn: () => getAllAttendances()
  });

  const todayDate = dayjs().format('YYYY-MM-DD');

  const memberStatusMutation = useMutation({
    mutationFn: (date: string) => moveMemberStatus(member.id, date)
  });

  const navigate = useNavigate();

  async function takeAttendance() {
    if (!data) return;

    const isToday = data.find((a) => todayDate === a.date);

    if (!isToday) return;
    
    memberStatusMutation.mutate(todayDate);
    setOpen(true);
  }

  if (isError) {
    return "Error";
  }

  if (isLoading) {
    return "Loading";
  }

  return (
    <div className="font-body">
      <Card className="w-full font-body">
        <CardHeader className="w-full">
          <p>
          👋 Hey there, <span className="font-bold">{member.firstname}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="mt-2 p-4 border border-border rounded-xl">
            <QRCode value={member.id} />
          </div>
        </CardContent>
      </Card>
      <Card className={cn([
        "mt-4 font-body",
        currentUser ? 'block' : 'hidden'
      ])}>
        <CardHeader>
          <h2 className="font-bold text-center">🛠️ Officer Actions</h2>
          <Button onClick={takeAttendance}>Take Attendance</Button>
        </CardHeader>
      </Card>
      <AlertDialog open={open && memberStatusMutation.isSuccess} >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-body">Attendance Taken!</AlertDialogTitle>
            <AlertDialogDescription className="font-body">
              Attendance is success for user: <span className="text-gray-800">{member.firstname}</span>
              <ul className="ml-4 text-left list-disc">
                <li>Email: <span className="text-gray-800">{member.email}</span></li>
                <li>Checkin Time: 
                  <span className="text-gray-800">
                    {
                      dayjs(memberStatusMutation.data?.attendances[todayDate].checkIn).format('MMMM D, YYYY h:mm A') 
                      || 'Undefined'
                    }
                  </span></li>
                <li>Checkin Status: <span className="text-gray-800">{memberStatusMutation.data?.attendances[todayDate].status || 'Undefined'}</span></li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="font-body" onClick={() => navigate({ to: '/members' })}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}