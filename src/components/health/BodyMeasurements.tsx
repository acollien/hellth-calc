import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";

interface BodyMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BodyMeasurements = ({ metrics, onMetricChange }: BodyMeasurementsProps) => {
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

  const renderMetricInput = (
    label: string,
    key: keyof HealthMetrics,
    tooltip: string,
    placeholder: string
  ) => (
    <div className="space-y-2">
      <div className="flex items-center">
        <Label htmlFor={key}>
          {label} ({metrics.unit === "metric" ? "cm" : "in"})
        </Label>
        {renderTooltip(tooltip)}
      </div>
      <Input
        id={key}
        type="number"
        value={metrics[key]}
        onChange={(e) => onMetricChange(key, e.target.value)}
        placeholder={placeholder}
        className="transition-all duration-200 focus:ring-mint-500"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Body Measurements</h3>
      <div className="grid gap-4 sm:grid-cols-3">
        {renderMetricInput("Neck", "neck", "Measure around the middle of your neck", "35")}
        {renderMetricInput("Waist", "waist", "Measure at navel level", "80")}
        {renderMetricInput("Hip", "hip", "Measure at the widest point", "95")}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {renderMetricInput("Wrist", "wrist", "Measure around your wrist", "16")}
        {renderMetricInput("Forearm", "forearm", "Measure at the widest point", "25")}
      </div>
    </div>
  );
};

export default BodyMeasurements;