import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface MetabolicResultsProps {
  bmr: {
    bmr: number;
    tdee?: number;
  };
}

const MetabolicResults = ({ bmr }: MetabolicResultsProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Metabolic Rates</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-mint-800 font-medium">BMR (calories/day)</div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {Math.round(bmr.bmr)}
                  </div>
                </div>
                <Info className="h-4 w-4 text-mint-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Basal Metabolic Rate (BMR)</h4>
                <p>The number of calories your body burns at rest to maintain basic life functions.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">Mifflin-St Jeor Equation</p>
                  <p>Men: (10 × weight) + (6.25 × height) - (5 × age) + 5</p>
                  <p>Women: (10 × weight) + (6.25 × height) - (5 × age) - 161</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        {bmr.tdee && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">TDEE (calories/day)</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {Math.round(bmr.tdee)}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Total Daily Energy Expenditure (TDEE)</h4>
                  <p>The total number of calories you burn in a day, including activity.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Calculation:</p>
                    <p>TDEE = BMR × Activity Level Multiplier</p>
                    <p className="font-medium mt-2">Activity Multipliers:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Sedentary: × 1.2</li>
                      <li>Light Activity: × 1.375</li>
                      <li>Moderate Activity: × 1.55</li>
                      <li>Very Active: × 1.725</li>
                      <li>Extra Active: × 1.9</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetabolicResults;