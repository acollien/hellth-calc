import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface AbsiCardProps {
  value: { metric: number; imperial: number };
  unit: 'metric' | 'imperial';
}

const AbsiCard = ({ value, unit }: AbsiCardProps) => {
  const getValueColor = (value: number) => {
    return value < 0.07 ? "text-green-600" : 
           value < 0.08 ? "text-yellow-600" : 
           "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="flex items-center gap-2">
        <span className="text-sm text-mint-800 font-medium">A Body Shape Index</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-4">
            <h4 className="font-semibold">A Body Shape Index</h4>
            <p>ABSI is based on waist circumference adjusted for height and weight.</p>
            <div className="text-sm space-y-1">
              <p className="font-medium">Interpretation:</p>
              <ul className="list-disc pl-4">
                <li>Below 0.07: Low mortality risk</li>
                <li>0.07-0.08: Average mortality risk</li>
                <li>Above 0.08: High mortality risk</li>
              </ul>
              <p className="mt-2">Lower values generally indicate better health outcomes.</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className={`text-2xl font-semibold ${getValueColor(value[unit])}`}>
        {value[unit].toFixed(5)}
      </div>
    </div>
  );
};

export default AbsiCard;