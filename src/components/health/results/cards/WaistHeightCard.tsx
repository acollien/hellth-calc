import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import RangeBar from "@/components/health/visualizations/RangeBar";

interface WaistHeightCardProps {
  value: number;
}

const WaistHeightCard = ({ value }: WaistHeightCardProps) => {
  const waistHeightRanges = [
    { min: 0, max: 0.4, label: "Very Low", color: "#D3E4FD", description: "WHtR less than 0.4" },
    { min: 0.4, max: 0.5, label: "Healthy", color: "#F2FCE2", description: "WHtR between 0.4 and 0.5" },
    { min: 0.5, max: 0.6, label: "Overweight", color: "#FEC6A1", description: "WHtR between 0.5 and 0.6" },
    { min: 0.6, max: 1, label: "Obese", color: "#ea384c", description: "WHtR greater than 0.6" }
  ];

  return (
    <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
      <div className="flex items-center gap-2">
        <span className="text-sm text-mint-800 font-medium">Waist-to-Height Ratio</span>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs p-4">
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
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="text-2xl font-semibold text-mint-900">
        {value.toFixed(3)}
      </div>
      <RangeBar
        value={value}
        ranges={waistHeightRanges}
        max={1}
        unit="ratio"
      />
    </div>
  );
};

export default WaistHeightCard;