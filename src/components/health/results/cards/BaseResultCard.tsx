import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { formatValue } from "@/utils/health/display/formatters";
import { getValueColor } from "@/utils/health/display/colors";

interface TooltipContentProps {
  title: string;
  description: string;
  formula?: string;
  interpretation?: ReactNode;
  additionalContent?: ReactNode;
}

interface BaseResultCardProps {
  label: string;
  value: number | null;
  valueColor: string;
  tooltipContent: TooltipContentProps;
  precision?: number;
  unit?: string;
  children?: ReactNode;
  className?: string;
}

const BaseResultCard = ({
  label,
  value,
  valueColor,
  tooltipContent,
  precision = 1,
  unit = "",
  children,
  className = ""
}: BaseResultCardProps) => {
  console.log(`Rendering BaseResultCard for ${label} with value:`, value);
  
  return (
    <div className={`p-4 rounded-lg bg-mint-50 border border-mint-100 ${className}`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                {label}
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${valueColor}`}>
                {formatValue(value, precision)}
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