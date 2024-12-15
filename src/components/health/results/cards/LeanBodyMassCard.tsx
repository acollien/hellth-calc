import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LeanBodyMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const LeanBodyMassCard = ({ value, unit }: LeanBodyMassCardProps) => {
  const getLBMColor = (value: number) => {
    if (value < 35) return "text-blue-600";
    if (value < 65) return "text-green-600";
    if (value < 80) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-mint-800 font-medium">Lean Body Mass</div>
              <div className={`text-2xl font-semibold ${getLBMColor(value)}`}>
                {value.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Lean Body Mass (LBM)</h4>
            <p>The weight of your body excluding fat.</p>
            <div className="text-sm">
              <p className="font-medium">Typical ranges:</p>
              <ul className="list-disc pl-4">
                <li>Low: &lt;35 kg</li>
                <li>Normal: 35-65 kg</li>
                <li>High: 65-80 kg</li>
                <li>Very High: &gt;80 kg</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LeanBodyMassCard;