import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BodyAdiposityCardProps {
  value: number;
}

const BodyAdiposityCard = ({ value }: BodyAdiposityCardProps) => {
  const getColor = (value: number) => {
    if (value < 8) return "text-blue-600";
    if (value < 21) return "text-green-600";
    if (value < 33) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start gap-2">
            <div>
              <div className="text-sm text-mint-800 font-medium">Body Adiposity Index</div>
              <div className={`text-2xl font-semibold ${getColor(value)}`}>
                {value.toFixed(1)}%
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500 mt-1" />
          </div>
        </TooltipTrigger>
        <TooltipContent align="start" className="max-w-xs p-4">
          <div className="space-y-2 text-left">
            <h4 className="font-semibold">Body Adiposity Index (BAI)</h4>
            <p>Estimates body fat percentage using hip circumference and height.</p>
            <div className="text-sm">
              <p className="font-medium">Healthy ranges:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Men: 8-20%</li>
                <li>Women: 21-33%</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BodyAdiposityCard;