import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Member } from "../types/Member";
import QRCode from 'react-qr-code';
import { changeMemberStatus, moveMemberStatus } from "../api/member";
import { default as dayjs } from 'dayjs';
import { getAllAttendances } from "../../../api/attendance";
import { useNavigate } from "@tanstack/react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/context/AuthContext";
import { cn } from "../../../lib/utils";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../../components/ui/alert-dialog";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "../../../components/ui/select";
import { MemberStatus } from "../types/MemberStatus";
import { MemberAttendance } from "../types/MemberAttendance";
import { toast, Toaster } from "sonner";

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  const todayDate = dayjs().format('YYYY-MM-DD');
  const { currentUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [attendance, setAttendance] = useState<MemberAttendance>();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['attendance-member-detail'],
    queryFn: () => getAllAttendances()
  });

  const memberStatusMutation = useMutation({
    mutationFn: (date: string) => moveMemberStatus(member.id, date)
  });


  const changeMemberStatusMutation = useMutation({
    mutationFn: (date: string) => changeMemberStatus(member.id, date, attendance?.status || MemberStatus.ABSENT)
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (memberStatusMutation.isSuccess) {
      setAttendance(memberStatusMutation.data?.attendances[todayDate]);
    }
  }, [memberStatusMutation.data?.attendances, memberStatusMutation.isSuccess, todayDate]);

  useEffect(() => {
    if (member.attendances[todayDate]) {
      setAttendance(member.attendances[todayDate]);
    }
  }, [member.attendances, todayDate]);

  async function takeAttendance() {
    if (!data) return;

    const isToday = data.find((a) => todayDate === a.date);

    if (!isToday) return;
    
    memberStatusMutation.mutate(todayDate);
  }

  async function changeStatus() {
    changeMemberStatusMutation.mutate(todayDate);
  }

  if (changeMemberStatusMutation.isSuccess) {
    toast('Change status to ' +  attendance?.status);
    changeMemberStatusMutation.reset();
  }

  if (changeMemberStatusMutation.isError) {
    toast('Error changing status: ' + changeMemberStatusMutation.error.message);
    changeMemberStatusMutation.reset();
  }

  if (memberStatusMutation.isSuccess) {
    memberStatusMutation.reset();
    setTimeout(() => setOpen(true));
  }

  if (memberStatusMutation.isError) {
    toast('Error taking attendances: ' + memberStatusMutation.error.message);
    memberStatusMutation.reset();
  }

  console.log(open);

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
        </CardHeader>
        <CardContent>
          <Button className="bg-green-500 hover:bg-green-600 w-full" onClick={takeAttendance}>Take Attendance</Button>
          <div className="gap-4 grid grid-cols-2 mt-8">
            <Select 
              value={attendance?.status || MemberStatus.ABSENT} 
              onValueChange={(v) => setAttendance({ ...attendance, status: v as MemberStatus } as MemberAttendance)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={MemberStatus.PRESENT}>Present</SelectItem>
                <SelectItem value={MemberStatus.LATE}>Late</SelectItem>
                <SelectItem value={MemberStatus.ABSENT}>Absent</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={changeStatus} className="w-full">Change Status</Button>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={open} >
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
                      dayjs(attendance?.checkIn).format('MMMM D, YYYY h:mm A') 
                      || 'Undefined'
                    }
                  </span></li>
                <li>Checkin Status: <span className="text-gray-800">{attendance?.status || 'Undefined'}</span></li>
              </ul>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="font-body" onClick={() => navigate({ to: '/members' })}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Toaster />
    </div>
  );
}