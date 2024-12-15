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
              <p>Also known as the corpulence index, PI is a measure of leanness that accounts for the natural scaling of mass with height.</p>
              <div className="text-sm space-y-1">
                <p className="font-medium">Method:</p>
                <p>Developed as an improvement over BMI for taller individuals, as it uses the cube of height instead of square.</p>
                <p className="font-medium mt-2">Formula:</p>
                <p className="text-mint-700">PI = Weight / Height³</p>
                <p className="text-mint-700">Where:</p>
                <ul className="list-disc pl-4">
                  <li>Weight in kg (metric) or lb (imperial)</li>
                  <li>Height in m (metric) or ft (imperial)</li>
                </ul>
                <p className="font-medium mt-2">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>&lt;11: Underweight</li>
                  <li>11-14: Normal weight</li>
                  <li>14-17: Overweight</li>
                  <li>&gt;17: Obese</li>
                </ul>
                <p className="mt-2">Values are typically between 11 and 14 for adults with normal build.</p>
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