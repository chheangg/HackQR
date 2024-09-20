import { Aside } from "../features/Aside";
import { AsideItem, AsideItemProps } from "../features/Aside/components/AsideItem";
import { NavBar } from "../features/NavBar";
import { NavBarItem } from "../features/NavBar/components/NavBarItem";

const navData: AsideItemProps[] = [
  {
    to: '/attendances',
    content: 'Attendance',
  },
  {
    to: '/members',
    content: 'Member',
    childRoutes: [
      /^\/members\/present/,
      /^\/members\/late/,
      /^\/members\/absent/,
    ]
  }
]

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
          {
            navData.map((nav) => (
              <AsideItem 
                {...nav}
                key={nav.content}
              />
            ))
          }
        </Aside>
        <main className="col-start-2 -col-end-1">
          {children}
        </main>
      </div>
    </div>
  )
}