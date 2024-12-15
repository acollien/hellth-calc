import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface WaistHeightCardProps {
  value: number;
}

const WaistHeightCard = ({ value }: WaistHeightCardProps) => {
  const getBackgroundColor = (ratio: number) => {
    if (ratio < 0.4) return "bg-[#D3E4FD]"; // Very Low
    if (ratio < 0.5) return "bg-[#F2FCE2]"; // Healthy
    if (ratio < 0.6) return "bg-[#FEC6A1]"; // Overweight
    return "bg-[#ea384c]"; // Obese
  };

  const getTextColor = (ratio: number) => {
    if (ratio >= 0.6) return "text-white";
    return "text-mint-900";
  };

  const getLabel = (ratio: number) => {
    if (ratio < 0.4) return "Very Low";
    if (ratio < 0.5) return "Healthy";
    if (ratio < 0.6) return "Overweight";
    return "Obese";
  };

  return (
    <div className={`p-4 rounded-lg ${getBackgroundColor(value)} transition-colors duration-300`}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                Waist-to-Height Ratio
                <Info className="h-4 w-4 text-mint-500" />
              </div>
              <div className={`text-2xl font-semibold ${getTextColor(value)}`}>
                {value.toFixed(3)}
              </div>
              <div className={`text-sm font-medium mt-1 ${getTextColor(value)}`}>
                {getLabel(value)}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-4">
          <div className="space-y-2">
            <h4 className="font-semibold">Waist-to-Height Ratio (WHtR)</h4>
            <p>A simple and effective screening tool for cardiovascular health risk and central obesity.</p>
            <div className="text-sm space-y-2">
              <div>
                <p className="font-medium">Formula:</p>
                <p className="text-mint-700">WHtR = Waist Circumference / Height</p>
              </div>
              <div>
                <p className="font-medium">Ranges:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Below 0.4: Very Low - may indicate insufficient body mass</li>
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
  );
};

export default WaistHeightCard;