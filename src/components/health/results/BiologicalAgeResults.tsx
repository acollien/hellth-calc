import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface BiologicalAgeResultsProps {
  biologicalAge: number;
}

const BiologicalAgeResults = ({ biologicalAge }: BiologicalAgeResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Biological Age Estimation</h3>
      <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
        <div className="flex items-center gap-2">
          <span className="text-sm text-mint-800 font-medium">Estimated Biological Age</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-mint-500" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Biological Age</h4>
                <p>An estimate of your body's physiological age based on various health metrics.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Factors Considered:</p>
                  <ul className="list-disc pl-4">
                    <li>BMI and weight distribution</li>
                    <li>Body composition metrics</li>
                    <li>Waist-to-height ratio</li>
                    <li>Physical measurements</li>
                  </ul>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="text-2xl font-semibold text-mint-900">
          {biologicalAge} years
        </div>
      </div>
    </div>
  );
};

export default BiologicalAgeResults;