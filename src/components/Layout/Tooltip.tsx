import {
  Tooltip as ShadCnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconType } from "react-icons";

type TooltipProps = {
  text: string;
  triggerText?: string;
  onClick?: () => void;
  isIcon?: boolean;
  icon?: IconType;
  iconSize?: number;
};

export default function Tooltip({
  text,
  triggerText,
  onClick,
  isIcon = false,
  icon: Icon,
  iconSize = 20,
}: TooltipProps) {
  return (
    <TooltipProvider>
      <ShadCnTooltip>
        <TooltipTrigger asChild>
          {isIcon && Icon ? ( // Check if Icon is defined before rendering
            <button onClick={onClick}>
              <Icon size={iconSize} />
            </button>
          ) : (
            <p className="w-full">{triggerText}</p>
          )}
        </TooltipTrigger>
        <TooltipContent side="top" className="bg-black text-white">
          <p>{text}</p>
        </TooltipContent>
      </ShadCnTooltip>
    </TooltipProvider>
  );
}
