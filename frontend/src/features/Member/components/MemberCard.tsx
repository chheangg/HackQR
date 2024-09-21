import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { Member } from "../types/Member";
import QRCode from 'react-qr-code';

interface MemberCardProps {
  member: Member;
}

export function MemberCard({ member }: MemberCardProps) {
  return (
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
  );
}