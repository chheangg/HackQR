import React from "react";

interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  return (
    <div className="md:flex flex-col gap-1 hidden">
      {children}
    </div>
  );
}