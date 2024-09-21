interface NavBarItemProps {
  children?: React.ReactNode;
  className?: string;
}

export function NavBarItem({ children, className } : NavBarItemProps) {
  return (
    <div className={"py-2 font-body" + className ? className : ''}>
      {children}
    </div>
  );
}