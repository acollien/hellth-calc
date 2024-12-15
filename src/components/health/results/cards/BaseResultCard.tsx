import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipContentProps {
  title: string;
  description: string;
  formula?: string;
  interpretation?: ReactNode;
  additionalContent?: ReactNode;
}

interface BaseResultCardProps {
  label: string;
  value: string | number;
  valueColor: string;
  tooltipContent: TooltipContentProps;
  unit?: string;
  children?: ReactNode;
}

const BaseResultCard = ({
  label,
  value,
  valueColor,
  tooltipContent,
  unit = "",
  children
}: BaseResultCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                {label}
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${valueColor}`}>
                {typeof value === 'number' ? value.toFixed(2) : value}
                {unit && ` ${unit}`}
              </div>
              {children}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">{tooltipContent.title}</h4>
            <div className="text-sm space-y-2">
              <p>{tooltipContent.description}</p>
              {tooltipContent.formula && (
                <div>
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">{tooltipContent.formula}</p>
                </div>
              )}
              {tooltipContent.interpretation && (
                <div>
                  <p className="font-medium">Interpretation:</p>
                  {tooltipContent.interpretation}
                </div>
              )}
              {tooltipContent.additionalContent}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BaseResultCard;