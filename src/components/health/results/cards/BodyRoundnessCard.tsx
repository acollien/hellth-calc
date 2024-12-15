import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BodyRoundnessCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const BodyRoundnessCard = ({ value, unit }: BodyRoundnessCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 1) return "text-blue-600";
    if (value < 2) return "text-green-600";
    if (value < 3) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="flex items-center gap-2">
        <span className="text-sm text-mint-800 font-medium">Body Roundness Index</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Body Roundness Index (BRI)</h4>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">BRI = 364.2 - 365.5 × √(1 - ((WC / (2π))² / (0.09 × H²)))</p>
                </div>
                <div>
                  <p className="font-medium">Description:</p>
                  <p>Uses an elliptical model of human body shape to quantify the roundness of the body and predict body fat percentage.</p>
                </div>
                <div>
                  <p className="font-medium">Interpretation:</p>
                  <ul className="list-disc pl-4">
                    <li>Below 1: Very lean body shape</li>
                    <li>1-2: Normal body shape</li>
                    <li>2-3: Overweight body shape</li>
                    <li>Above 3: Obese body shape</li>
                  </ul>
                </div>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
        {value[unit].toFixed(2)}
      </div>
    </div>
  );
};

export default BodyRoundnessCard;