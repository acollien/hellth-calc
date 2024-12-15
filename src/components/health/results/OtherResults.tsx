import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface OtherResultsProps {
  frameSize?: string;
  waistToHip?: number;
  biologicalAge?: number;
}

const OtherResults = ({ frameSize, waistToHip, biologicalAge }: OtherResultsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {frameSize && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                    Body Frame Size
                    <Info className="h-4 w-4 text-mint-500" />
                  </div>
                  <div className="text-2xl font-semibold text-mint-900 capitalize">
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
                  <p className="font-medium">Categories:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Small: Height/Wrist &gt; {10.4}</li>
                    <li>Medium: Height/Wrist {9.6} - {10.4}</li>
                    <li>Large: Height/Wrist &lt; {9.6}</li>
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
                  <div className="text-2xl font-semibold text-mint-900">
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
                  <p className="font-medium">Healthy Ranges:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Men: Below 0.90</li>
                    <li>Women: Below 0.85</li>
                  </ul>
                  <p className="mt-2">Higher ratios indicate increased health risks.</p>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      {biologicalAge && (
        <div className="p-4 rounded-lg bg-mint-50 border border-mint-100">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="text-sm text-mint-800 font-medium flex items-center gap-2">
                    Estimated Biological Age
                    <Info className="h-4 w-4 text-mint-500" />
                  </div>
                  <div className="text-2xl font-semibold text-mint-900">
                    {biologicalAge} years
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Biological Age</h4>
                <p>An estimate of your body's physiological age based on various health metrics.</p>
                <div className="text-sm space-y-1">
                  <p className="font-medium">Factors Considered:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>BMI (weight distribution)</li>
                    <li>Waist-to-hip ratio</li>
                    <li>Chronological age</li>
                    <li>Physical measurements</li>
                  </ul>
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