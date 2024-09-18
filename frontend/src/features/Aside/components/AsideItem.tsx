import { Button } from "../../../components/ui/button";

interface AsideItemProps {
  children: React.ReactNode;
}

export function AsideItem({ children }: AsideItemProps) {
  return (
    <Button variant="ghost" className="justify-start hover:bg-neutral-200 font-normal text-lg">
      {children}
    </Button>
  )
}