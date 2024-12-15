import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface OtherResultsProps {
  frameSize: string | null;
  waistToHip?: number;
}

const OtherResults = ({ frameSize, waistToHip }: OtherResultsProps) => {
  console.log("OtherResults received frameSize:", frameSize);
  
  const getFrameSizeColor = (size: string | null) => {
    if (!size) return "text-mint-900";
    switch (size.toLowerCase()) {
      case 'small': return "text-blue-600";
      case 'medium': return "text-green-600";
      case 'large': return "text-yellow-600";
      default: return "text-mint-900";
    }
  };

  const getWHRColor = (ratio: number, gender?: string) => {
    if (gender === 'male') {
      if (ratio < 0.85) return "text-green-600";
      if (ratio < 0.90) return "text-yellow-600";
      return "text-red-600";
    } else {
      if (ratio < 0.80) return "text-green-600";
      if (ratio < 0.85) return "text-yellow-600";
      return "text-red-600";
    }
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {frameSize && frameSize !== 'undefined' && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                    Body Frame Size
                    <Info className="h-4 w-4 text-mint-500" />
                  </div>
                  <div className={`text-2xl font-semibold ${getFrameSizeColor(frameSize)} capitalize`}>
                    {frameSize}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Body Frame Size</h4>
                <p>Determined by wrist circumference in relation to height.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Method:</p>
                  <p>Uses the height-to-wrist ratio to determine frame size.</p>
                  <p className="font-medium mt-2">Formula:</p>
                  <p className="text-mint-700">Frame Size Index = Height (cm) / Wrist Circumference (cm)</p>
                  <p className="font-medium mt-2">Categories:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Small: Height/Wrist &gt; 10.4</li>
                    <li>Medium: Height/Wrist 9.6 - 10.4</li>
                    <li>Large: Height/Wrist &lt; 9.6</li>
                  </ul>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {waistToHip && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                    Waist-to-Hip Ratio
                    <Info className="h-4 w-4 text-mint-500" />
                  </div>
                  <div className={`text-2xl font-semibold ${getWHRColor(waistToHip)}`}>
                    {waistToHip.toFixed(2)}
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Waist-to-Hip Ratio (WHR)</h4>
                <p>A measure of body fat distribution and health risk.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Method:</p>
                  <p>Compares waist circumference to hip circumference to assess fat distribution patterns.</p>
                  <p className="font-medium mt-2">Formula:</p>
                  <p className="text-mint-700">WHR = Waist Circumference / Hip Circumference</p>
                  <p className="font-medium mt-2">Healthy Ranges:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Men: Below 0.90 (Optimal: &lt;0.85)</li>
                    <li>Women: Below 0.85 (Optimal: &lt;0.80)</li>
                  </ul>
                  <p className="mt-2">Higher ratios indicate increased health risks.</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default OtherResults;