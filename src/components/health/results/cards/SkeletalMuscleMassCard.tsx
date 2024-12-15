import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SkeletalMuscleMassCardProps {
  value: number;
  unit: 'metric' | 'imperial';
}

const SkeletalMuscleMassCard = ({ value, unit }: SkeletalMuscleMassCardProps) => {
  const getSMMColor = (value: number) => {
    if (value < 25) return "text-blue-600";
    if (value < 45) return "text-green-600";
    if (value < 55) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-mint-800 font-medium">Skeletal Muscle Mass</div>
              <div className={`text-2xl font-semibold ${getSMMColor(value)}`}>
                {value.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Skeletal Muscle Mass (SMM)</h4>
            <p>The amount of muscle attached to bones that you can voluntarily control.</p>
            <div className="text-sm">
              <p className="font-medium">Typical ranges:</p>
              <ul className="list-disc pl-4">
                <li>Low: &lt;25 kg</li>
                <li>Normal: 25-45 kg</li>
                <li>Athletic: 45-55 kg</li>
                <li>Elite: &gt;55 kg</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SkeletalMuscleMassCard;