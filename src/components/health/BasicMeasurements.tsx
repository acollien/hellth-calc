import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
    return `${value.toFixed(1)} ${metrics.unit === "metric" ? "cm" : "in"}`;
  };

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
          <div className="flex items-center gap-2">
            <Label htmlFor="gender">Biological Sex at Birth</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                  <Info className="h-4 w-4 text-mint-500" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>We acknowledge that gender exists on a spectrum. Due to the historical nature of available medical calculation methods, this application currently requires biological sex at birth for accurate results. We are committed to updating our methods as more inclusive research becomes available.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Select
            value={metrics.gender}
            onValueChange={(value: 'male' | 'female') => onMetricChange('gender', value)}
          >
            <SelectTrigger>
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
            step={getHeightRange().step}
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
            step={getWeightRange().step}
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
            step={1}
            onValueChange={(value) => onMetricChange('age', value[0].toString())}
            className="mt-2"
          />
        </div>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-xs">Legal Information</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Legal Information</DialogTitle>
            <DialogDescription className="space-y-4">
              <p>This application ("Hellth") is provided for informational purposes only and should not be considered medical advice. Always consult with healthcare professionals for medical decisions.</p>
              
              <h4 className="font-semibold">Data Privacy</h4>
              <p>We do not collect, store, or sell any personal information. All calculations are performed locally in your browser.</p>
              
              <h4 className="font-semibold">Cookies</h4>
              <p>This application does not use cookies or tracking mechanisms.</p>
              
              <h4 className="font-semibold">Disclaimer</h4>
              <p>The calculations and results provided are based on general formulas and may not account for individual variations or specific medical conditions. Use at your own discretion.</p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BasicMeasurements;
