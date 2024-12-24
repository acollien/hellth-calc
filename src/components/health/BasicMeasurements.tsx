import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";

interface BasicMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const BasicMeasurements = ({ metrics, onMetricChange }: BasicMeasurementsProps) => {
  const handleChange = (key: keyof HealthMetrics) => (event: React.ChangeEvent<HTMLInputElement>) => {
    onMetricChange(key, event.target.value);
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Height and Weight inputs */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <input
            type="number"
            id="height"
            value={metrics.height || ""}
            onChange={handleChange("height")}
            className="border rounded-md p-2"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <input
            type="number"
            id="weight"
            value={metrics.weight || ""}
            onChange={handleChange("weight")}
            className="border rounded-md p-2"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="gender">Biological Sex at Birth</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  type="button" 
                  onClick={(e) => e.preventDefault()}
                  className="hover:bg-transparent focus:outline-none"
                >
                  <Info className="h-4 w-4 text-mint-500 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>We acknowledge that gender exists on a spectrum. Due to the historical nature of available medical calculation methods, this application currently requires biological sex at birth for accurate results. We are committed to updating our methods as more inclusive research becomes available.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <select
            id="gender"
            value={metrics.gender || ""}
            onChange={handleChange("gender")}
            className="border rounded-md p-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="age">Age</Label>
          <input
            type="number"
            id="age"
            value={metrics.age || ""}
            onChange={handleChange("age")}
            className="border rounded-md p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicMeasurements;
