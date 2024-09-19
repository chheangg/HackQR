import { useLocation, useNavigate } from "@tanstack/react-router";
import { Button } from "../../../components/ui/button";

export interface AsideItemProps {

  to: string;
  content: string;
  childRoutes?: RegExp[];
}
export function AsideItem({ to, content, childRoutes }: AsideItemProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname === to;
  let orHasChild = false;

  if (childRoutes) {
    orHasChild = !!childRoutes.find((regex) => regex.test(location.pathname));
  }
  
  return (
    <Button 
      onClick={() => navigate({ to })}
      variant="ghost" 
      className={
        "justify-start hover:bg-neutral-200 font-normal text-lg" 
        + 
        ` ${(isSelected || orHasChild) ? 'bg-neutral-200' : ''}`
      }
    >
      {content}
    </Button>
  )
}