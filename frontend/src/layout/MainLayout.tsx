import { Aside } from "../features/Aside";
import { AsideItem } from "../features/Aside/components/AsideItem";
import { NavBar } from "../features/NavBar";
import { NavBarItem } from "../features/NavBar/components/NavBarItem";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-neutral-100 h-screen font-body">
      <NavBar>
        <NavBarItem>
          HackQR
        </NavBarItem>
      </NavBar>
      <div className="gap-4 grid grid-cols-4 pt-4 container">
        <Aside>
          <AsideItem>Attendance</AsideItem>
          <AsideItem>Member</AsideItem>
        </Aside>
        <main className="col-start-2 col-end-auto">
          {children}
        </main>
      </div>
    </div>
  )
}