import { TooltipTrigger } from "./ui/tooltip";
import { TooltipContent } from "./ui/tooltip";
import { Tooltip } from "./ui/tooltip";
import { TooltipProvider } from "./ui/tooltip";

interface ExpireTooltipProps {
    className?: string;
    trigger?: any;
    content?: string;
}

export const ExpireTooltip = ({ className, trigger, content }: ExpireTooltipProps) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={className}>{trigger}</TooltipTrigger>
                <TooltipContent>
                    <p className="text-[10px] font-medium">Expires on {content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
