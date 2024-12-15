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
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">BFDI = (Waist² × Height) / (Hip² × √Height)</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>A measure that evaluates how body fat is distributed between the waist and hip regions, taking height into account. This index helps assess central obesity and related health risks.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 0.5: Optimal fat distribution, lower health risk</li>
                  <li>0.5-0.8: Moderate fat distribution, increased health risk</li>
                  <li>Above 0.8: High central fat distribution, significant health risk</li>
                </ul>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default BodyFatDistributionCard;