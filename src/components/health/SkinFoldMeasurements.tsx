import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";

interface SkinFoldMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const SkinFoldMeasurements = ({ metrics, onMetricChange }: SkinFoldMeasurementsProps) => {
  const renderTooltip = (content: string) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button">
          <Info className="h-4 w-4 ml-1 text-mint-500" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  );

  const getUnit = () => metrics.unit === "metric" ? "mm" : "in";
  const getPlaceholder = (metricValue: string) => 
    metrics.unit === "metric" ? metricValue : (parseFloat(metricValue) / 25.4).toFixed(2);

  const renderMetricInput = (label: string, key: keyof HealthMetrics, tooltip: string, placeholder: string) => (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor={key}>{label} ({getUnit()})</Label>
        {renderTooltip(tooltip)}
      </div>
      <Input
        id={key}
        type="number"
        value={metrics[key]}
        onChange={(e) => {
          const value = e.target.value;
          // Convert to mm if imperial
          const finalValue = metrics.unit === "imperial" 
            ? (parseFloat(value) * 25.4).toString()
            : value;
          onMetricChange(key, finalValue);
        }}
        placeholder={getPlaceholder(placeholder)}
        className="transition-all duration-200 focus:ring-mint-500"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Skinfold Measurements</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {renderMetricInput("Triceps", "triceps", "Back of upper arm", "15")}
        {renderMetricInput("Subscapular", "subscapular", "Below shoulder blade", "17")}
        {renderMetricInput("Suprailiac", "suprailiac", "Above hip bone", "18")}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {renderMetricInput("Abdominal", "abdominal", "Next to navel", "20")}
        {renderMetricInput("Thigh", "thigh", "Front of thigh", "25")}
        {renderMetricInput("Chest", "chest", "Diagonal fold", "15")}
      </div>
    </div>
  );
};

export default SkinFoldMeasurements;