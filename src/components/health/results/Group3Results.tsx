import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import LeanMassIndexCard from "./cards/LeanMassIndexCard";
import BodyAdiposityCard from "./cards/BodyAdiposityCard";
import ConicityCard from "./cards/ConicityCard";

interface Group3ResultsProps {
  leanMassIndex?: number | null;
  bodyAdiposityIndex?: number | null;
  conicityIndex?: number | null;
  unit: 'metric' | 'imperial';
}

const Group3Results = ({ 
  leanMassIndex, 
  bodyAdiposityIndex, 
  conicityIndex,
  unit 
}: Group3ResultsProps) => {
  console.log("Group3Results received values:", {
    leanMassIndex,
    bodyAdiposityIndex,
    conicityIndex
  });
  
  // Only render if at least one value is present and not null
  if (!leanMassIndex && !bodyAdiposityIndex && !conicityIndex) {
    console.log("No values present in Group3Results, not rendering");
    return null;
  }

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-mint-800">Advanced Body Measurements</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent align="start" className="max-w-xs p-4">
            <p>Advanced measurements that provide detailed insights about your body composition and health risks.</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="grid grid-cols-1 gap-4 w-full mx-auto">
        {typeof leanMassIndex === 'number' && !isNaN(leanMassIndex) && (
          <LeanMassIndexCard value={leanMassIndex} />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {typeof bodyAdiposityIndex === 'number' && !isNaN(bodyAdiposityIndex) && (
            <BodyAdiposityCard value={bodyAdiposityIndex} />
          )}
          {typeof conicityIndex === 'number' && !isNaN(conicityIndex) && (
            <ConicityCard value={conicityIndex} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Group3Results;