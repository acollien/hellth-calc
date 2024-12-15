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
            <div className="space-y-2">
              <h4 className="font-semibold">Waist-to-Height Ratio (WHtR)</h4>
              
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Formula:</p>
                  <p className="text-mint-700">WHtR = Waist Circumference / Height</p>
                </div>
                
                <div>
                  <p className="font-medium">Description:</p>
                  <p>A simple and effective screening tool for cardiovascular health risk and central obesity. It accounts for the impact of height on healthy waist circumference values.</p>
                </div>
                
                <div>
                  <p className="font-medium">Interpretation:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Below 0.4: Underweight - may indicate insufficient body mass</li>
                    <li>0.4-0.5: Healthy - optimal range for health outcomes</li>
                    <li>0.5-0.6: Overweight - increased health risks</li>
                    <li>Above 0.6: Obese - significantly elevated health risks</li>
                  </ul>
                </div>
              </div>
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