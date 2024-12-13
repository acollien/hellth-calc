import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";

interface BasicMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BasicMeasurements = ({ metrics, onMetricChange }: BasicMeasurementsProps) => {
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
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="unit">Unit System</Label>
          <Select
            value={metrics.unit}
            onValueChange={(value: 'metric' | 'imperial') => onMetricChange('unit', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select unit system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (cm/kg)</SelectItem>
              <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select
            value={metrics.gender}
            onValueChange={(value: 'male' | 'female') => onMetricChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {renderMetricInput("Height", "height", "Your standing height", "175")}
        {renderMetricInput("Weight", "weight", "Your current weight", "70")}
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            value={metrics.age}
            onChange={(e) => onMetricChange('age', e.target.value)}
            placeholder="25"
            className="transition-all duration-200 focus:ring-mint-500"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicMeasurements;