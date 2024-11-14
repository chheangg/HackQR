import { ColumnDef } from "@tanstack/react-table";
import { Member } from "../types/Member";
import { Button } from "../../../components/ui/button";
import { Copy } from "lucide-react";

export const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: 'id',
    header: 'Copy ID',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      return (
        <Button 
          className="hover:bg-zinc-700"
          onClick={() => { 
            navigator.clipboard.writeText(id);
            window.alert("User ID copied!");
          }} size='icon'>
          <Copy />
        </Button>
      );
    }
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => <span className="font-semibold">{row.getValue('email')}</span>
  },
  {
    accessorKey: 'firstname',
    header: 'First Name'
  },
  {
    id: 'qr-code-link',
    header: 'QR Code Link',
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <a 
          className="hover:text-sky-800 underline"
          href={'/members/'+id} 
          target="_blank" 
          rel="noreferrer"
        >
            QR Code Link
        </a>
      );
    }
  }
];