import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface LeanMassIndexCardProps {
  value: number;
}

const LeanMassIndexCard = ({ value }: LeanMassIndexCardProps) => {
  const getColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 19) return "text-green-600";
    if (value < 22) return "text-yellow-600";
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
                <p>A measure of lean body mass relative to height, similar to BMI but specifically for muscle mass assessment.</p>
              </div>
              <div>
                <p className="font-medium">Interpretation:</p>
                <ul className="list-disc pl-4">
                  <li>Men: 16-20 kg/m² (normal range)</li>
                  <li>Women: 13-17 kg/m² (normal range)</li>
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