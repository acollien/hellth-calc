import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LeanMassIndexCardProps {
  value: number | null;
}

const LeanMassIndexCard = ({ value }: LeanMassIndexCardProps) => {
  console.log('LeanMassIndexCard rendering with value:', value);

  if (!value || isNaN(value)) {
    console.log('Invalid LeanMassIndex value, not rendering card');
    return null;
  }

  const getColor = (val: number) => {
    if (val < 16) return "text-blue-600";
    if (val < 19) return "text-green-600";
    if (val < 22) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start gap-2">
            <div>
              <div className="text-sm text-mint-800 font-medium">Lean Mass Index</div>
              <div className={`text-2xl font-semibold ${getColor(value)}`}>
                {value.toFixed(1)}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500 mt-1" />
          </div>
        </TooltipTrigger>
        <TooltipContent align="start" className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Lean Mass Index (LMI)</h4>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">LMI = Lean Mass / Height²</p>
              </div>
              <div>
                <p className="font-medium">Description:</p>
                <p>A measure that assesses lean body mass relative to height, providing insight into muscle mass distribution independent of body fat.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Below 16: Low muscle mass relative to height</li>
                  <li>16-19: Normal muscle mass</li>
                  <li>19-22: Athletic muscle mass</li>
                  <li>Above 22: Exceptional muscle mass</li>
                </ul>
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LeanMassIndexCard;