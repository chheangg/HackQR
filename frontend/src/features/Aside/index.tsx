import React from "react"

interface AsideProps {
  children: React.ReactNode;
}

export function Aside({ children }: AsideProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}
    </div>
  )
}