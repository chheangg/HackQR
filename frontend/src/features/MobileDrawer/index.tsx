import { Link, useNavigate } from "@tanstack/react-router";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "../../components/ui/drawer";
import { AsideItemProps } from "../Aside/components/AsideItem";
import { X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import { SignOutUser } from "../../lib/firebase";

export interface MobileDrawerProps {
  children: React.ReactNode;
  navData: AsideItemProps[];
}

export function MobileDrawer({ children, navData }: MobileDrawerProps) {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger onClick={() => setOpen(true)} asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="relative place-content-center grid w-[280px] h-full">
          <div className="top-0 right-12 absolute">
            <DrawerClose onClick={() => setOpen(false)}>
              <Button size="icon" variant="outline">
                <X />
              </Button>
            </DrawerClose>
          </div>
          <div className="flex flex-col gap-6 font-body text-xl">
            {
              navData.map((n) => (
                <Link key={n.content} onClick={() => setOpen(false)} to={n.to}>
                  {n.content}
                </Link>
              ))
            }
            <Button
              onClick={async () => {
                await SignOutUser();
                navigate({ to: '/login' });
              }} 
              variant='ghost' 
              className="mt-12 text-lg text-red-500 hover:text-red-600"
            >
          Sign out
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}