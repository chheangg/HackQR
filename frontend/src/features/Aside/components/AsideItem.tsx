import { Button } from "../../../components/ui/button";

interface AsideItemProps {
  children: React.ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

export function AsideItem({ children, isSelected, onClick }: AsideItemProps) {
  return (
    <Button 
      onClick={onClick}
      variant="ghost" 
      className={
        "justify-start hover:bg-neutral-200 font-normal text-lg" 
        + 
        ` ${isSelected ? 'bg-neutral-200' : ''}`
      }
    >
      {children}
    </Button>
  )
}