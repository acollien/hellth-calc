import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Group2ResultsProps {
  leanBodyMass: number | null;
  fatFreeMassIndex: number | null;
  skeletalMuscleMass: number | null;
  bodyFatDistribution: number | null;
  unit: 'metric' | 'imperial';
}

const Group2Results = ({ 
  leanBodyMass, 
  fatFreeMassIndex, 
  skeletalMuscleMass, 
  bodyFatDistribution,
  unit 
}: Group2ResultsProps) => {
  if (!leanBodyMass && !fatFreeMassIndex && !skeletalMuscleMass && !bodyFatDistribution) {
    return null;
  }

  const getFFMIColor = (ffmi: number) => {
    if (ffmi < 18) return "text-blue-600";
    if (ffmi < 20) return "text-green-600";
    if (ffmi < 22) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Mass and Composition</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {leanBodyMass !== null && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Lean Body Mass</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {leanBodyMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Lean Body Mass (LBM)</h4>
                  <p>Your total body weight minus fat weight. Includes muscle, bone, organs, and water.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Calculation Method:</p>
                    <p>Uses the Boer Formula, which is accurate for most body types.</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {fatFreeMassIndex !== null && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Fat-Free Mass Index</div>
                    <div className={`text-2xl font-semibold ${getFFMIColor(fatFreeMassIndex)}`}>
                      {fatFreeMassIndex.toFixed(1)}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Fat-Free Mass Index (FFMI)</h4>
                  <p>A measure of muscle mass relative to height, normalized for different body sizes.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Ranges:</p>
                    <ul className="list-disc pl-4">
                      <li>Below 18: Low muscle mass</li>
                      <li>18-20: Average</li>
                      <li>20-22: Above average</li>
                      <li>Above 22: Exceptional</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {skeletalMuscleMass !== null && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Skeletal Muscle Mass</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {skeletalMuscleMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Skeletal Muscle Mass (SMM)</h4>
                  <p>The amount of muscle tissue attached to your skeleton, responsible for movement.</p>
                  <div className="text-sm">
                    <p>Calculated using the Lee Formula, which considers height, weight, age, and gender.</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {bodyFatDistribution !== null && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Body Fat Distribution Index</div>
                    <div className="text-2xl font-semibold text-mint-900">
                      {bodyFatDistribution.toFixed(2)}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Body Fat Distribution Index</h4>
                  <p>Indicates how your body fat is distributed, particularly in relation to your waist and hips.</p>
                  <div className="text-sm">
                    <p>A higher value indicates more central (abdominal) fat distribution.</p>
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

export default Group2Results;