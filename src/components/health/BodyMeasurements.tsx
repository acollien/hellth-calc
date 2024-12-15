import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";

interface BodyMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BodyMeasurements = ({ metrics, onMetricChange }: BodyMeasurementsProps) => {
  const getRange = (measurement: string) => {
    const ranges = {
      neck: metrics.unit === "metric" ? { min: 20, max: 60, step: 0.5 } : { min: 8, max: 24, step: 0.25 },
      waist: metrics.unit === "metric" ? { min: 40, max: 200, step: 0.5 } : { min: 16, max: 79, step: 0.25 },
      hip: metrics.unit === "metric" ? { min: 50, max: 200, step: 0.5 } : { min: 20, max: 79, step: 0.25 },
      wrist: metrics.unit === "metric" ? { min: 10, max: 25, step: 0.5 } : { min: 4, max: 10, step: 0.25 },
      forearm: metrics.unit === "metric" ? { min: 15, max: 50, step: 0.5 } : { min: 6, max: 20, step: 0.25 }
    };
    return ranges[measurement as keyof typeof ranges];
  };

  const formatValue = (value: number, measurement: string) => {
    return `${value} ${metrics.unit === "metric" ? "cm" : "in"}`;
  };

  const renderMeasurement = (label: string, key: keyof HealthMetrics, tooltip: string) => {
    const range = getRange(key);
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label>{label} {formatValue(Number(metrics[key]) || range.min, key)}</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-mint-500" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Slider
          value={[Number(metrics[key]) || range.min]}
          min={range.min}
          max={range.max}
          step={range.step}
          onValueChange={(value) => onMetricChange(key, value[0].toString())}
          className="mt-2"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Body Measurements</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {renderMeasurement("Neck", "neck", "Measure around the middle of your neck")}
        {renderMeasurement("Waist", "waist", "Measure at navel level")}
        {renderMeasurement("Hip", "hip", "Measure at the widest point")}
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {renderMeasurement("Wrist", "wrist", "Measure around your wrist")}
        {renderMeasurement("Forearm", "forearm", "Measure at the widest point")}
      </div>
    </div>
  );
};

export default BodyMeasurements;