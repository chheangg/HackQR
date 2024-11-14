import React from "react";
import { Button } from "../../components/ui/button";
import { SignOutUser } from "../../lib/firebase";
import { useNavigate } from "@tanstack/react-router";

interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  const navigate = useNavigate();
  return (
    <>
      <div className="md:flex flex-col gap-1 hidden">
        {children}
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
    </>

  );
}