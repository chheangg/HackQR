import { useState } from "react";
import { Aside } from "../features/Aside";
import { AsideItem } from "../features/Aside/components/AsideItem";
import { NavBar } from "../features/NavBar";
import { NavBarItem } from "../features/NavBar/components/NavBarItem";
import { useNavigate } from "@tanstack/react-router";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const navigate = useNavigate();
  const [selectedAsideIndex, SetSelectedAsideIndex] = useState<number>(0)

  function onClickAsideItem(index: number, path: string) {
    SetSelectedAsideIndex(index);
    navigate({ to: path });
  }

  return (
    <div className="bg-neutral-100 h-screen font-body">
      <NavBar>
        <NavBarItem>
          HackQR
        </NavBarItem>
      </NavBar>
      <div className="gap-4 grid grid-cols-4 pt-4 container">
        <Aside>
          <AsideItem 
            isSelected={0 == selectedAsideIndex}
            onClick={() => onClickAsideItem(0, '/attendances')}
          >
            Attendance
          </AsideItem>
          <AsideItem 
            isSelected={1 == selectedAsideIndex}
            onClick={() => onClickAsideItem(1, '/members')}
          >
            Member
          </AsideItem>
        </Aside>
        <main className="col-start-2 -col-end-1">
          {children}
        </main>
      </div>
    </div>
  )
}