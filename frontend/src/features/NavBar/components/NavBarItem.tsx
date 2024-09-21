interface NavBarItemProps {
  children?: React.ReactNode;
}

export function NavBarItem({ children } : NavBarItemProps) {
  return (
    <div className="py-2 font-body">
      {children}
    </div>
  );
}