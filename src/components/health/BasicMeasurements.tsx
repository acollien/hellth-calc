import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";
import { Slider } from "@/components/ui/slider";

interface BasicMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BasicMeasurements = ({ metrics, onMetricChange }: BasicMeasurementsProps) => {
  const getHeightRange = () => {
    return metrics.unit === "metric" 
      ? { min: 54.0, max: 251.0, step: 0.1 }    // cm (updated for record holders)
      : { min: 21.0, max: 99.0, step: 0.1 };    // inches
  };

  const getWeightRange = () => {
    return metrics.unit === "metric"
      ? { min: 2.0, max: 635.0, step: 0.1 }    // kg (updated for record holders)
      : { min: 4.4, max: 1400.0, step: 0.1 };  // lbs
  };

  const formatValue = (value: number, type: 'height' | 'weight') => {
    if (type === 'height') {
      return `${value.toFixed(1)} ${metrics.unit === "metric" ? "cm" : "in"}`;
    }
    return `${value.toFixed(1)} ${metrics.unit === "metric" ? "kg" : "lbs"}`;
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <Label htmlFor="unit">Unit System</Label>
          <Select
            value={metrics.unit}
            onValueChange={(value: 'metric' | 'imperial') => onMetricChange('unit', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select unit system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="metric">Metric (cm/kg)</SelectItem>
              <SelectItem value="imperial">Imperial (in/lbs)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="gender">Biological Sex at Birth</Label>
            <Popover>
              <PopoverTrigger>
                <Info className="h-4 w-4 text-mint-500" />
              </PopoverTrigger>
              <PopoverContent 
                side="top" 
                align="start" 
                className="max-w-[280px] z-50 sm:side-right"
              >
                <p>We acknowledge that gender exists on a spectrum. Due to the historical nature of available medical calculation methods, this application currently requires biological sex at birth for accurate results. We are committed to updating our methods as more inclusive research becomes available.</p>
              </PopoverContent>
            </Popover>
          </div>
          <Select
            value={metrics.gender}
            onValueChange={(value: 'male' | 'female') => onMetricChange('gender', value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select biological sex at birth" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="space-y-4">
          <Label>Height {formatValue(Number(metrics.height) || getHeightRange().min, 'height')}</Label>
          <Slider
            value={[Number(metrics.height) || getHeightRange().min]}
            min={getHeightRange().min}
            max={getHeightRange().max}
            step={0.1}
            onValueChange={(value) => onMetricChange('height', value[0].toString())}
            className="mt-2"
          />
        </div>
        
        <div className="space-y-4">
          <Label>Weight {formatValue(Number(metrics.weight) || getWeightRange().min, 'weight')}</Label>
          <Slider
            value={[Number(metrics.weight) || getWeightRange().min]}
            min={getWeightRange().min}
            max={getWeightRange().max}
            step={0.1}
            onValueChange={(value) => onMetricChange('weight', value[0].toString())}
            className="mt-2"
          />
        </div>

        <div className="space-y-4">
          <Label>Age {metrics.age || "0"} years</Label>
          <Slider
            value={[Number(metrics.age) || 0]}
            min={0}
            max={123}
            step={0.1}
            onValueChange={(value) => onMetricChange('age', value[0].toString())}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicMeasurements;