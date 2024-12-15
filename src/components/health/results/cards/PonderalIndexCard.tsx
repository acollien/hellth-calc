import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface PonderalIndexCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const PonderalIndexCard = ({ value, unit }: PonderalIndexCardProps) => {
  const getValueColor = (value: number) => {
    if (value < 11) return "text-blue-600";
    if (value < 14) return "text-green-600";
    if (value < 17) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="flex items-center gap-2">
        <span className="text-sm text-mint-800 font-medium">Ponderal Index</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Ponderal Index (PI)</h4>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">PI = Weight / Height³</p>
                </div>
                <div>
                  <p className="font-medium">Description:</p>
                  <p>A measure of leanness that accounts for the natural scaling of mass with height, developed as an improvement over BMI for taller individuals.</p>
                </div>
                <div>
                  <p className="font-medium">Interpretation:</p>
                  <ul className="list-disc pl-4">
                    <li>&lt;11: Underweight</li>
                    <li>11-14: Normal weight</li>
                    <li>14-17: Overweight</li>
                    <li>&gt;17: Obese</li>
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

export default PonderalIndexCard;