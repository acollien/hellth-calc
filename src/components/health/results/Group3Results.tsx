import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import RangeBar from "../visualizations/RangeBar";

interface Group3ResultsProps {
  leanMassIndex?: number;
  bodyAdiposityIndex?: number;
  conicityIndex?: number;
  unit: 'metric' | 'imperial';
}

const Group3Results = ({ leanMassIndex, bodyAdiposityIndex, conicityIndex, unit }: Group3ResultsProps) => {
  if (!leanMassIndex && !bodyAdiposityIndex && !conicityIndex) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-mint-900">Advanced Body Measurements</h3>
      
      <div className="grid gap-4">
        {leanMassIndex && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-mint-800 font-medium">Lean Mass Index</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-mint-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Lean Mass Index (LMI)</h4>
                    <p>Measures lean body mass relative to height. Useful for tracking muscle mass changes.</p>
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
            <div className="text-2xl font-semibold text-mint-900">
              {leanMassIndex.toFixed(1)} kg/m²
            </div>
            <RangeBar
              value={leanMassIndex}
              ranges={[
                { min: 0, max: 13, label: "Low", color: "#FDE68A", description: "Below typical range" },
                { min: 13, max: 20, label: "Normal", color: "#34D399", description: "Typical range" },
                { min: 20, max: 30, label: "High", color: "#FCA5A5", description: "Above typical range" }
              ]}
              unit="kg/m²"
              max={30}
            />
          </div>
        )}

        {bodyAdiposityIndex && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-mint-800 font-medium">Body Adiposity Index</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-mint-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4">
                  <div className="space-y-2">
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
            <div className="text-2xl font-semibold text-mint-900">
              {bodyAdiposityIndex.toFixed(1)}%
            </div>
            <RangeBar
              value={bodyAdiposityIndex}
              ranges={[
                { min: 0, max: 8, label: "Very Low", color: "#FDE68A", description: "Below healthy range" },
                { min: 8, max: 33, label: "Healthy", color: "#34D399", description: "Healthy range" },
                { min: 33, max: 50, label: "High", color: "#FCA5A5", description: "Above healthy range" }
              ]}
              unit="%"
              max={50}
            />
          </div>
        )}

        {conicityIndex && (
          <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
            <div className="flex items-center gap-2">
              <span className="text-sm text-mint-800 font-medium">Conicity Index</span>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-mint-500" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4">
                  <div className="space-y-2">
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
            <div className="text-2xl font-semibold text-mint-900">
              {conicityIndex.toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Group3Results;