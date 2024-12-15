import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RangeBar from "@/components/health/visualizations/RangeBar";

interface Group1ResultsProps {
  ponderalIndex: { metric: number; imperial: number } | null;
  absi: { metric: number; imperial: number } | null;
  bodyRoundnessIndex: { metric: number; imperial: number } | null;
  waistToHeightRatio: number | null;
  unit: 'metric' | 'imperial';
}

const Group1Results = ({ ponderalIndex, absi, bodyRoundnessIndex, waistToHeightRatio, unit }: Group1ResultsProps) => {
  const waistHeightRanges = [
    { min: 0, max: 0.4, label: "Very Low", color: "#D3E4FD", description: "WHtR less than 0.4" },
    { min: 0.4, max: 0.5, label: "Healthy", color: "#F2FCE2", description: "WHtR between 0.4 and 0.5" },
    { min: 0.5, max: 0.6, label: "Overweight", color: "#FEC6A1", description: "WHtR between 0.5 and 0.6" },
    { min: 0.6, max: 1, label: "Obese", color: "#ea384c", description: "WHtR greater than 0.6" }
  ];

  const getValueColor = (value: number, type: string) => {
    switch (type) {
      case 'ponderal':
        return value < 11 ? "text-blue-600" : value < 14 ? "text-green-600" : value < 17 ? "text-yellow-600" : "text-red-600";
      case 'absi':
        return value < 0.07 ? "text-green-600" : value < 0.08 ? "text-yellow-600" : "text-red-600";
      case 'bri':
        return value < 1 ? "text-blue-600" : value < 2 ? "text-green-600" : value < 3 ? "text-yellow-600" : "text-red-600";
      default:
        return "text-mint-900";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-medium text-mint-800">Body Indices</h3>
      
      {ponderalIndex && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-mint-800 font-medium">Ponderal Index</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-mint-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Ponderal Index (PI)</h4>
                  <p>Also known as corpulence index, PI is a measure of leanness computed as weight divided by height cubed.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Interpretation:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>&lt;11: Underweight</li>
                      <li>11-14: Normal weight</li>
                      <li>14-17: Overweight</li>
                      <li>&gt;17: Obese</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`text-2xl font-semibold ${getValueColor(ponderalIndex[unit], 'ponderal')}`}>
            {ponderalIndex[unit].toFixed(2)} {unit === 'metric' ? 'kg/m³' : 'lb/ft³'}
          </div>
        </div>
      )}

      {absi && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-mint-800 font-medium">A Body Shape Index (ABSI)</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-mint-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">A Body Shape Index</h4>
                  <p>ABSI is based on waist circumference adjusted for height and weight.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Interpretation:</p>
                    <ul className="list-disc pl-4">
                      <li>Below 0.07: Low mortality risk</li>
                      <li>0.07-0.08: Average mortality risk</li>
                      <li>Above 0.08: High mortality risk</li>
                    </ul>
                    <p className="mt-2">Lower values generally indicate better health outcomes.</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`text-2xl font-semibold ${getValueColor(absi[unit], 'absi')}`}>
            {absi[unit].toFixed(5)} {unit === 'metric' ? 'm¹¹/⁶/kg²/³' : 'in¹¹/⁶/lb²/³'}
          </div>
        </div>
      )}

      {bodyRoundnessIndex && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-mint-800 font-medium">Body Roundness Index</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-mint-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Body Roundness Index (BRI)</h4>
                  <p>BRI combines height and waist circumference to predict body fat and visceral adipose tissue.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Interpretation:</p>
                    <ul className="list-disc pl-4">
                      <li>Below 1: Very lean body shape</li>
                      <li>1-2: Normal body shape</li>
                      <li>2-3: Overweight body shape</li>
                      <li>Above 3: Obese body shape</li>
                    </ul>
                    <p className="mt-2">Lower values indicate less rounded body shapes and generally better health outcomes.</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className={`text-2xl font-semibold ${getValueColor(bodyRoundnessIndex[unit], 'bri')}`}>
            {bodyRoundnessIndex[unit].toFixed(2)}
          </div>
        </div>
      )}

      {waistToHeightRatio && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-mint-800 font-medium">Waist-to-Height Ratio</span>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-mint-500" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Waist-to-Height Ratio (WHtR)</h4>
                  <p>A simple measure of central obesity and associated health risks.</p>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">Interpretation:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>&lt;0.4: Underweight</li>
                      <li>0.4-0.5: Healthy</li>
                      <li>0.5-0.6: Overweight</li>
                      <li>&gt;0.6: Obese</li>
                    </ul>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="text-2xl font-semibold text-mint-900">
            {waistToHeightRatio.toFixed(3)}
          </div>
          <RangeBar
            value={waistToHeightRatio}
            ranges={waistHeightRanges}
            max={1}
            unit="ratio"
          />
        </div>
      )}
    </div>
  );
};

export default Group1Results;
