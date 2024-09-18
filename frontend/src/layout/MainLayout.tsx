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
      <div className="container">
        {children}
      </div>
    </div>
  )
}