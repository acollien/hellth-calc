import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface FatFreeMassCardProps {
  value: number;
}

const FatFreeMassCard = ({ value }: FatFreeMassCardProps) => {
  const getFFMIColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 25) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-mint-800 font-medium">Fat-Free Mass Index</div>
              <div className={`text-2xl font-semibold ${getFFMIColor(value)}`}>
                {value.toFixed(1)}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Fat-Free Mass Index (FFMI)</h4>
            <p>A measure of lean mass relative to height, similar to BMI but for muscle mass.</p>
            <div className="text-sm">
              <p className="font-medium">Ranges:</p>
              <ul className="list-disc pl-4">
                <li>Low: &lt;16</li>
                <li>Normal: 16-20</li>
                <li>Athletic: 20-25</li>
                <li>Exceptional: &gt;25</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FatFreeMassCard;