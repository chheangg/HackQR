import { Menu } from 'lucide-react';
import { Aside } from "../features/Aside";
import { AsideItem, AsideItemProps } from "../features/Aside/components/AsideItem";
import { NavBar } from "../features/NavBar";
import { NavBarItem } from "../features/NavBar/components/NavBarItem";
import { Button } from '../components/ui/button';
import { MobileDrawer } from '../features/MobileDrawer';

const navData: AsideItemProps[] = [
  {
    to: '/attendances',
    content: 'Attendance'
  },
  {
    to: '/members',
    content: 'Member',
    childRoutes: [
      /^\/members\/present/,
      /^\/members\/late/,
      /^\/members\/absent/
    ]
  }
];

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
        <div>

        </div>
        <NavBarItem>
        </NavBarItem>
        <NavBarItem>
          <MobileDrawer navData={navData}>
            <Button size="icon" className='place-content-center md:hidden grid hover:bg-transparent' variant="ghost">
              <Menu size={32} />
            </Button>
          </MobileDrawer>
        </NavBarItem>
      </NavBar>
      <div className="block gap-4 md:grid grid-cols-4 pt-4 container">
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
  );
}