import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface BasicMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BasicMeasurements = ({ metrics, onMetricChange }: BasicMeasurementsProps) => {
  const { toast } = useToast();

  const validateNumericInput = (value: string, fieldName: string, min: number, max: number) => {
    if (value === "") return true;
    
    const num = parseFloat(value);
    if (isNaN(num)) {
      toast({
        title: "Invalid Input",
        description: `${fieldName} must be a numeric value`,
        variant: "destructive"
      });
      return false;
    }
    if (num < min || num > max) {
      toast({
        title: "Invalid Range",
        description: `${fieldName} must be between ${min} and ${max} ${fieldName === "Height" ? (metrics.unit === "metric" ? "cm" : "inches") : (metrics.unit === "metric" ? "kg" : "lbs")}`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleInputChange = (key: keyof HealthMetrics, value: string, fieldName: string, min: number, max: number) => {
    // Always update the field value first
    onMetricChange(key, value);
    
    // Only validate if the field is not empty and when the user has finished typing
    if (value !== "") {
      setTimeout(() => {
        if (!validateNumericInput(value, fieldName, min, max)) {
          onMetricChange(key, "");
        }
      }, 1500); // Delay validation by 1.5 seconds to allow for typing
    }
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

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="height">Height ({metrics.unit === "metric" ? "cm" : "in"})</Label>
          <Input
            id="height"
            type="number"
            value={metrics.height}
            onChange={(e) => handleInputChange('height', e.target.value, 'Height', 
              metrics.unit === "metric" ? 100 : 39,  // Adjusted minimum heights
              metrics.unit === "metric" ? 250 : 98)} // Adjusted maximum heights
            className="transition-all duration-200 focus:ring-mint-500"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="weight">Weight ({metrics.unit === "metric" ? "kg" : "lbs"})</Label>
          <Input
            id="weight"
            type="number"
            value={metrics.weight}
            onChange={(e) => handleInputChange('weight', e.target.value, 'Weight',
              metrics.unit === "metric" ? 30 : 66,   // Adjusted minimum weights
              metrics.unit === "metric" ? 300 : 661)} // Adjusted maximum weights
            className="transition-all duration-200 focus:ring-mint-500"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age">Age (years)</Label>
          <Input
            id="age"
            type="number"
            value={metrics.age}
            onChange={(e) => handleInputChange('age', e.target.value, 'Age', 0, 120)}
            className="transition-all duration-200 focus:ring-mint-500"
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