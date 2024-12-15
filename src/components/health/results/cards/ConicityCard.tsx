import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ConicityCardProps {
  value: number;
}

const ConicityCard = ({ value }: ConicityCardProps) => {
  const getColor = (value: number) => {
    if (value < 1.25) return "text-green-600";
    if (value < 1.35) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-start gap-2">
            <div>
              <div className="text-sm text-mint-800 font-medium">Conicity Index</div>
              <div className={`text-2xl font-semibold ${getColor(value)}`}>
                {value.toFixed(2)}
              </div>
            </div>
            <Info className="h-4 w-4 text-mint-500 mt-1" />
          </div>
        </TooltipTrigger>
        <TooltipContent align="start" className="max-w-xs p-4">
          <div className="space-y-2 text-left">
            <h4 className="font-semibold">Conicity Index (C-Index)</h4>
            <p>Measures abdominal fat distribution and cardiovascular risk.</p>
            <div className="text-sm">
              <p className="font-medium">Risk levels:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Low risk: &lt; 1.25</li>
                <li>Moderate risk: 1.25-1.35</li>
                <li>High risk: &gt; 1.35</li>
              </ul>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ConicityCard;