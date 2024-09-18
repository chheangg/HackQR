interface NavBarProps {
  children?: React.ReactNode;
}

export function NavBar({ children }: NavBarProps) {
  return (
    <div className="flex flex-rows bg-neutral-200 font-body">
      <div className="container">
        {children}
      </div>
    </div>
  )
}