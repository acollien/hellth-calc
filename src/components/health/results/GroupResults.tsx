import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface GroupResultsProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const GroupResults = ({ title, description, children, className = "" }: GroupResultsProps) => {
  console.log(`Rendering GroupResults for ${title}`);
  
  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-mint-800">{title}</h3>
        {description && (
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-mint-500" />
            </TooltipTrigger>
            <TooltipContent align="start" className="max-w-xs p-4">
              <p>{description}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default GroupResults;