import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ReactNode } from "react";
import { formatValue } from "@/utils/health/display/formatters";

interface TooltipContentProps {
  title: string;
  description: string;
  formula: string;
  interpretation: ReactNode;
  citation: {
    text: string;
    url: string;
  };
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
  return (
    <div className={`p-4 rounded-lg bg-mint-50 border border-mint-100 ${className}`}>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-start gap-2 cursor-pointer">
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
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="space-y-2">
            <h4 className="font-semibold">{tooltipContent.title}</h4>
            <p>{tooltipContent.description}</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">{tooltipContent.formula}</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                {tooltipContent.interpretation}
              </div>
              <div className="mt-2 text-xs text-gray-600">
                <p className="font-medium">Citation:</p>
                <a 
                  href={tooltipContent.citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {tooltipContent.citation.text}
                </a>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BaseResultCard;