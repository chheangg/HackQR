import { Menu, ScanQrCode, X } from 'lucide-react';
import { Aside } from "../features/Aside";
import { AsideItem, AsideItemProps } from "../features/Aside/components/AsideItem";
import { NavBar } from "../features/NavBar";
import { NavBarItem } from "../features/NavBar/components/NavBarItem";
import { Button } from '../components/ui/button';
import { MobileDrawer } from '../features/MobileDrawer';
import { useState } from 'react';
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner';
import { useNavigate } from '@tanstack/react-router';

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
  const [openScanner, setOpenScanner] = useState<boolean>(false);
  const navigate = useNavigate();

  function onScan(result: IDetectedBarcode[]) {
    const qrResult = result[0];
    const memberId = qrResult.rawValue;

    console.log(memberId);

    setOpenScanner(false);
    
    navigate({ to: '/members/' + memberId });
  }

  return (
    <div className="bg-white-50 h-screen font-body">
      <div className={openScanner ? 'block' : 'hidden'}>
        <div className='z-10 absolute inset-0 place-content-center grid bg-gray-500 bg-opacity-50'>
          <div className='flex flex-row-reverse'>
            <Button className='mr-4' size='icon' variant="outline" onClick={() => setOpenScanner(false)}>
              <X />
            </Button>
          </div>
          <div className='mt-4'>
            <Scanner paused={!openScanner} onScan={onScan} />
          </div>
        </div>
      </div>
      <NavBar>
        <NavBarItem>
          HackQR
        </NavBarItem>
        <div>

        </div>
        <NavBarItem className='mr-4'>
          <Button 
            onClick={() => setOpenScanner(true)} 
            className='flex gap-2 md:hidden bg-green-500 text-lg'
          >
            <ScanQrCode />
            Scan
          </Button>
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