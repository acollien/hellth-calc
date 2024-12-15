import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BodyFatDistributionCardProps {
  value: number;
}

const BodyFatDistributionCard = ({ value }: BodyFatDistributionCardProps) => {
  const getBFDColor = (value: number) => {
    if (value < 0.5) return "text-green-600";
    if (value < 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-mint-800 font-medium">Body Fat Distribution Index</div>
              <div className={`text-2xl font-semibold ${getBFDColor(value)}`}>
                {value.toFixed(2)}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Body Fat Distribution Index (BFDI)</h4>
            <p>Indicates how body fat is distributed between the waist and hips.</p>
            <div className="text-sm">
              <p className="font-medium">Interpretation:</p>
              <ul className="list-disc pl-4">
                <li>Optimal: &lt;0.5</li>
                <li>Moderate: 0.5-0.8</li>
                <li>High Risk: &gt;0.8</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BodyFatDistributionCard;