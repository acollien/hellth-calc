import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface SkinfoldPointProps {
  label: string;
  value: string;
  point: string;
  tooltip: string;
  onChange: (value: string) => void;
  unit: 'metric' | 'imperial';
}

const SkinfoldPoint = ({ label, value, point, tooltip, onChange, unit }: SkinfoldPointProps) => {
  const range = unit === 'metric' 
    ? { min: 1, max: 100, step: 0.5 }    // mm
    : { min: 0.04, max: 4, step: 0.02 };  // inches

  const formatValue = (val: number) => {
    return `${val} ${unit === "metric" ? "mm" : "in"}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label>{label} {formatValue(Number(value) || range.min)}</Label>
        <Tooltip>
          <TooltipTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </TooltipTrigger>
          <TooltipContent className="w-80">
            <div className="space-y-2">
              <p className="text-sm font-medium">Point {point} - {tooltip}</p>
              <div className="relative aspect-[2/3] w-full">
                <img 
                  src="/lovable-uploads/9f167f2d-afc8-40ac-a2b0-95f97593c5da.png" 
                  alt="Skinfold measurement points diagram" 
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Image source: measurement-toolkit.org/anthropometry/objective-methods/simple-measures-skinfolds
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
      <Slider
        value={[Number(value) || range.min]}
        min={range.min}
        max={range.max}
        step={range.step}
        onValueChange={(value) => onChange(value[0].toString())}
        className="mt-2"
      />
    </div>
  );
};

export default SkinfoldPoint;