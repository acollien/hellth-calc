import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
  // Only render if at least one value is present and not null
  if (!leanMassIndex && !bodyAdiposityIndex && !conicityIndex) return null;

  const getLMIColor = (value: number) => {
    if (value < 16) return "text-blue-600";
    if (value < 19) return "text-green-600";
    if (value < 22) return "text-yellow-600";
    return "text-red-600";
  };

  const getBAIColor = (value: number) => {
    if (value < 8) return "text-blue-600";
    if (value < 21) return "text-green-600";
    if (value < 33) return "text-yellow-600";
    return "text-red-600";
  };

  const getCIndexColor = (value: number) => {
    if (value < 1.25) return "text-green-600";
    if (value < 1.35) return "text-yellow-600";
    return "text-red-600";
  };

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
        {typeof leanMassIndex === 'number' && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-mint-500 mt-1" />
                  <div>
                    <div className="text-sm text-mint-800 font-medium">Lean Mass Index</div>
                    <div className={`text-2xl font-semibold ${getLMIColor(leanMassIndex)}`}>
                      {leanMassIndex.toFixed(1)}
                    </div>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent align="start" className="max-w-xs p-4">
                <div className="space-y-2 text-left">
                  <h4 className="font-semibold">Lean Mass Index (LMI)</h4>
                  <p>A measure of lean body mass relative to height.</p>
                  <div className="text-sm">
                    <p className="font-medium">Typical ranges:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Men: 16-20 kg/m²</li>
                      <li>Women: 13-17 kg/m²</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {typeof bodyAdiposityIndex === 'number' && (
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-mint-500 mt-1" />
                    <div>
                      <div className="text-sm text-mint-800 font-medium">Body Adiposity Index</div>
                      <div className={`text-2xl font-semibold ${getBAIColor(bodyAdiposityIndex)}`}>
                        {bodyAdiposityIndex.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent align="start" className="max-w-xs p-4">
                  <div className="space-y-2 text-left">
                    <h4 className="font-semibold">Body Adiposity Index (BAI)</h4>
                    <p>Estimates body fat percentage using hip circumference and height.</p>
                    <div className="text-sm">
                      <p className="font-medium">Healthy ranges:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Men: 8-20%</li>
                        <li>Women: 21-33%</li>
                      </ul>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          {typeof conicityIndex === 'number' && (
            <div className="p-4 rounded-lg bg-mint-50 border border-mint-100 w-full">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-mint-500 mt-1" />
                    <div>
                      <div className="text-sm text-mint-800 font-medium">Conicity Index</div>
                      <div className={`text-2xl font-semibold ${getCIndexColor(conicityIndex)}`}>
                        {conicityIndex.toFixed(2)}
                      </div>
                    </div>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Group3Results;