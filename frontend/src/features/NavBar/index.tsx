interface NavBarProps {
  children?: React.ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <div className="bg-neutral-200 py-2 font-body">
      <div className="items-center grid grid-cols-[auto,1fr,auto,auto] container">
        {children}
      </div>
    </div>
  );
}