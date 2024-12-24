import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Info } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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
    ? { min: 1, max: 100, step: 0.1 }    // mm
    : { min: 0.04, max: 4, step: 0.1 };  // inches

  const formatValue = (val: number) => {
    return `${val} ${unit === "metric" ? "mm" : "in"}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Label>{label} {formatValue(Number(value) || range.min)}</Label>
        <Popover>
          <PopoverTrigger>
            <Info className="h-4 w-4 text-mint-500" />
          </PopoverTrigger>
          <PopoverContent 
            side="top" 
            align="center" 
            className="max-w-[280px] z-50"
          >
            <div className="space-y-2">
              <h4 className="font-semibold">Skinfold Measurement - {label}</h4>
              <div className="text-sm space-y-2">
                <div>
                  <p className="font-medium">Method:</p>
                  <p className="text-mint-700">Vertical fold measurement using caliper at point {point}</p>
                </div>
                <div>
                  <p className="font-medium">Description:</p>
                  <p>{tooltip}</p>
                </div>
                <div>
                  <p className="font-medium">Interpretation:</p>
                  <ul className="list-disc pl-4">
                    <li>Low: Below 5mm</li>
                    <li>Normal: 5-15mm</li>
                    <li>Moderate: 15-25mm</li>
                    <li>High: Above 25mm</li>
                  </ul>
                </div>
                <div className="relative aspect-[2/3] w-full mt-4">
                  <img 
                    src="/lovable-uploads/9f167f2d-afc8-40ac-a2b0-95f97593c5da.png" 
                    alt="Skinfold measurement points diagram" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Slider
        value={[Number(value) || range.min]}
        min={range.min}
        max={range.max}
        step={0.1}
        onValueChange={(value) => onChange(value[0].toString())}
        className="mt-2"
      />
    </div>
  );
};

export default SkinfoldPoint;
