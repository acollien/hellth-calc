import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";
import { BodyDiagram } from "./visualizations/BodyDiagram";

interface SkinFoldMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const SkinFoldMeasurements = ({ metrics, onMetricChange }: SkinFoldMeasurementsProps) => {
  const getRange = () => {
    return metrics.unit === "metric" 
      ? { min: 1, max: 100, step: 0.5 }    // mm
      : { min: 0.04, max: 4, step: 0.02 };  // inches
  };

  const formatValue = (value: number) => {
    return `${value} ${metrics.unit === "metric" ? "mm" : "in"}`;
  };

  const renderMeasurement = (label: string, key: keyof HealthMetrics, tooltip: string) => {
    const range = getRange();
    const value = metrics[key] 
      ? metrics.unit === "metric" 
        ? Number(metrics[key])
        : Number(metrics[key]) / 25.4
      : range.min;

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Label>{label} {formatValue(value)}</Label>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-mint-500" />
            </TooltipTrigger>
            <TooltipContent className="flex gap-4 p-4">
              <BodyDiagram 
                gender={metrics.gender || 'male'} 
                measurementType={key}
              />
              <p className="max-w-xs">{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Slider
          value={[value]}
          min={range.min}
          max={range.max}
          step={range.step}
          onValueChange={(value) => {
            const finalValue = metrics.unit === "imperial"
              ? (value[0] * 25.4).toString()
              : value[0].toString();
            onMetricChange(key, finalValue);
          }}
          className="mt-2"
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Skinfold Measurements</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {renderMeasurement("Triceps", "triceps", "Back of upper arm")}
        {renderMeasurement("Subscapular", "subscapular", "Below shoulder blade")}
        {renderMeasurement("Suprailiac", "suprailiac", "Above hip bone")}
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {renderMeasurement("Abdominal", "abdominal", "Next to navel")}
        {renderMeasurement("Thigh", "thigh", "Front of thigh")}
        {renderMeasurement("Chest", "chest", "Diagonal fold")}
      </div>
    </div>
  );
};

export default SkinFoldMeasurements;