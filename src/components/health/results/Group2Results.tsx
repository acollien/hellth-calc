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

  const getLBMColor = (value: number) => {
    if (value < 45) return "text-blue-600";
    if (value < 65) return "text-green-600";
    if (value < 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getFFMIColor = (value: number) => {
    if (value < 18) return "text-blue-600";
    if (value < 20) return "text-green-600";
    if (value < 22) return "text-yellow-600";
    return "text-red-600";
  };

  const getSMMColor = (value: number) => {
    if (value < 25) return "text-blue-600";
    if (value < 35) return "text-green-600";
    if (value < 45) return "text-yellow-600";
    return "text-red-600";
  };

  const getBFDColor = (value: number) => {
    if (value < 0.8) return "text-green-600";
    if (value < 1.0) return "text-yellow-600";
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
                  <p>Your total body weight minus fat weight. Includes muscle, bone, organs, and water.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Method:</p>
                    <p>Uses the Boer Formula, which is considered accurate for most body types.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">For men:</p>
                    <p className="text-mint-700">LBM = (0.407 × Weight) + (0.267 × Height) - 19.2</p>
                    <p className="text-mint-700">For women:</p>
                    <p className="text-mint-700">LBM = (0.252 × Weight) + (0.473 × Height) - 48.3</p>
                    <p className="text-mint-700">Where:</p>
                    <ul className="list-disc pl-4">
                      <li>Weight in kg</li>
                      <li>Height in cm</li>
                    </ul>
                    <p className="font-medium mt-2">Typical Ranges:</p>
                    <p>Men:</p>
                    <ul className="list-disc pl-4">
                      <li>Athletes: 55-70 kg (121-154 lbs)</li>
                      <li>Average: 50-65 kg (110-143 lbs)</li>
                    </ul>
                    <p className="mt-1">Women:</p>
                    <ul className="list-disc pl-4">
                      <li>Athletes: 45-60 kg (99-132 lbs)</li>
                      <li>Average: 40-55 kg (88-121 lbs)</li>
                    </ul>
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
                    <p className="font-medium">Method:</p>
                    <p>Developed to assess muscularity while accounting for height differences.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">FFMI = LBM / (height in m)²</p>
                    <p className="text-mint-700">Where:</p>
                    <ul className="list-disc pl-4">
                      <li>LBM = Lean Body Mass (kg)</li>
                      <li>Height in meters</li>
                    </ul>
                    <p className="font-medium mt-2">Ranges:</p>
                    <ul className="list-disc pl-4">
                      <li>Below 18: Low muscle mass</li>
                      <li>18-20: Average</li>
                      <li>20-22: Above average</li>
                      <li>Above 22: Exceptional</li>
                    </ul>
                    <p className="mt-2">Values above 25 are rare without performance enhancement.</p>
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
                  <p>The amount of muscle tissue attached to your skeleton, responsible for movement.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Method:</p>
                    <p>Uses the Lee Formula, which estimates SMM based on anthropometric measurements.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">SMM = (0.244 × Weight) + (0.117 × Height) - (0.127 × Age) + Sex Factor - 2.98</p>
                    <p className="text-mint-700">Where:</p>
                    <ul className="list-disc pl-4">
                      <li>Weight in kg</li>
                      <li>Height in cm</li>
                      <li>Sex Factor: Men = 2.29, Women = 0</li>
                    </ul>
                    <p className="font-medium mt-2">Typical Ranges:</p>
                    <p>Men:</p>
                    <ul className="list-disc pl-4">
                      <li>Athletes: 35-45 kg (77-99 lbs)</li>
                      <li>Average: 30-40 kg (66-88 lbs)</li>
                    </ul>
                    <p className="mt-1">Women:</p>
                    <ul className="list-disc pl-4">
                      <li>Athletes: 25-35 kg (55-77 lbs)</li>
                      <li>Average: 20-30 kg (44-66 lbs)</li>
                    </ul>
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
                    <div className="text-sm text-mint-800 font-medium">Body Fat Distribution</div>
                    <div className={`text-2xl font-semibold ${getBFDColor(bodyFatDistribution)}`}>
                      {bodyFatDistribution.toFixed(2)}
                    </div>
                  </div>
                  <Info className="h-4 w-4 text-mint-500" />
                </div>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Body Fat Distribution Index</h4>
                  <p>Indicates how your body fat is distributed between central and peripheral regions.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Method:</p>
                    <p>Calculates the relationship between waist size, hip circumference, and height to determine fat distribution patterns.</p>
                    <p className="font-medium mt-2">Formula:</p>
                    <p className="text-mint-700">BFD = (Waist² / (Hip × Height))</p>
                    <p className="text-mint-700">Where:</p>
                    <ul className="list-disc pl-4">
                      <li>Waist circumference in cm</li>
                      <li>Hip circumference in cm</li>
                      <li>Height in cm</li>
                    </ul>
                    <p className="font-medium mt-2">Interpretation:</p>
                    <ul className="list-disc pl-4">
                      <li>Below 0.8: Peripheral distribution (healthier)</li>
                      <li>0.8-1.0: Balanced distribution</li>
                      <li>Above 1.0: Central distribution (higher risk)</li>
                    </ul>
                    <p className="mt-2">Lower values generally indicate healthier fat distribution patterns.</p>
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