import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Group2ResultsProps {
  leanBodyMass?: number;
  fatFreeMassIndex?: number;
  skeletalMuscleMass?: number;
  bodyFatDistribution?: number;
  unit: 'metric' | 'imperial';
}

const Group2Results = ({ 
  leanBodyMass, 
  fatFreeMassIndex, 
  skeletalMuscleMass, 
  bodyFatDistribution,
  unit 
}: Group2ResultsProps) => {
  const getLBMColor = (value: number) => {
    if (value < 35) return "text-blue-600";
    if (value < 65) return "text-green-600";
    if (value < 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getFFMIColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 25) return "text-yellow-600";
    return "text-red-600";
  };

  const getSMMColor = (value: number) => {
    if (value < 25) return "text-blue-600";
    if (value < 45) return "text-green-600";
    if (value < 55) return "text-yellow-600";
    return "text-red-600";
  };

  const getBFDColor = (value: number) => {
    if (value < 0.5) return "text-green-600";
    if (value < 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-mint-800">Mass and Composition</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {leanBodyMass && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Lean Body Mass</div>
                    <div className={`text-2xl font-semibold ${getLBMColor(leanBodyMass)}`}>
                      {leanBodyMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
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
                    <p className="font-medium">Method:</p>
                    <p>Uses the Boer Formula, which accounts for height and weight differences between genders.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">For men:</p>
                    <p className="text-mint-700">LBM = (0.407 × weight) + (0.267 × height) - 19.2</p>
                    <p className="text-mint-700">For women:</p>
                    <p className="text-mint-700">LBM = (0.252 × weight) + (0.473 × height) - 48.3</p>
                    <p className="font-medium mt-2">Typical ranges:</p>
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
        )}

        {fatFreeMassIndex && (
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
                  <p>A measure of lean mass relative to height, similar to BMI but for muscle mass.</p>
                  <div className="text-sm">
                    <p className="font-medium">Method:</p>
                    <p>Normalizes lean body mass to height to assess muscular development.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">FFMI = LBM / (height in meters)²</p>
                    <p className="font-medium mt-2">Ranges:</p>
                    <ul className="list-disc pl-4">
                      <li>Low: &lt;16</li>
                      <li>Normal: 16-20</li>
                      <li>Athletic: 20-25</li>
                      <li>Exceptional: &gt;25</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {skeletalMuscleMass && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Skeletal Muscle Mass</div>
                    <div className={`text-2xl font-semibold ${getSMMColor(skeletalMuscleMass)}`}>
                      {skeletalMuscleMass.toFixed(1)} {unit === 'metric' ? 'kg' : 'lbs'}
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
                    <p className="font-medium">Method:</p>
                    <p>Uses the Lee Formula, which considers weight, height, age, gender, and ethnicity.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">SMM = (0.244 × weight) + (0.117 × height) - (0.127 × age) + (gender factor) - 2.98</p>
                    <p className="text-mint-700">Where gender factor = 2.29 for men, 0 for women</p>
                    <p className="font-medium mt-2">Typical ranges:</p>
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
        )}

        {bodyFatDistribution && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Body Fat Distribution Index</div>
                    <div className={`text-2xl font-semibold ${getBFDColor(bodyFatDistribution)}`}>
                      {bodyFatDistribution.toFixed(2)}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Body Fat Distribution Index (BFDI)</h4>
                  <p>Indicates how body fat is distributed between the waist and hips.</p>
                  <div className="text-sm">
                    <p className="font-medium">Method:</p>
                    <p>Combines waist and hip measurements with height to assess fat distribution patterns.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">BFDI = (waist² / (hip × height))</p>
                    <p className="font-medium mt-2">Interpretation:</p>
                    <ul className="list-disc pl-4">
                      <li>Optimal: &lt;0.5</li>
                      <li>Moderate: 0.5-0.8</li>
                      <li>High Risk: &gt;0.8</li>
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

export default Group2Results;