import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { HealthMetrics } from "./types";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

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

  const measurementPoints = [
    { 
      label: "Chest", 
      key: "chestSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (a) - Diagonal fold on the chest" 
    },
    { 
      label: "Midaxillary (Upper)", 
      key: "midaxillarySkinfold" as keyof HealthMetrics, 
      tooltip: "Point (b) - Vertical fold on the midaxillary line at nipple level" 
    },
    { 
      label: "Suprailiac", 
      key: "suprailiacSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (c) - Diagonal fold above the iliac crest" 
    },
    { 
      label: "Thigh", 
      key: "thighSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (d) - Vertical fold on the front of the thigh" 
    },
    { 
      label: "Umbilical", 
      key: "umbilicalSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (e) - Vertical fold 2cm right of the umbilicus" 
    },
    { 
      label: "Triceps", 
      key: "tricepsSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (f) - Vertical fold on the back of the upper arm" 
    },
    { 
      label: "Midaxillary (Lower)", 
      key: "midaxillarySkinfold2" as keyof HealthMetrics, 
      tooltip: "Point (g) - Vertical fold on the midaxillary line at the level of the xiphoid process" 
    },
    { 
      label: "Subscapular", 
      key: "subscapularSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (h) - Diagonal fold below the shoulder blade" 
    },
    { 
      label: "Calf", 
      key: "calfSkinfold" as keyof HealthMetrics, 
      tooltip: "Point (i) - Vertical fold on the medial side of the calf" 
    }
  ];

  const renderMeasurement = (point: typeof measurementPoints[0]) => {
    const range = getRange();
    const value = metrics[point.key] 
      ? metrics.unit === "metric" 
        ? Number(metrics[point.key])
        : Number(metrics[point.key]) / 25.4
      : range.min;

    return (
      <div key={point.key} className="space-y-4">
        <div className="flex items-center gap-2">
          <Label>{point.label} {formatValue(value)}</Label>
          <Popover>
            <PopoverTrigger>
              <Info className="h-4 w-4 text-mint-500" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <p className="text-sm font-medium">{point.tooltip}</p>
                <div className="relative aspect-[2/3] w-full">
                  <img 
                    src="/lovable-uploads/9f167f2d-afc8-40ac-a2b0-95f97593c5da.png" 
                    alt="Skinfold measurement points diagram" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Image source: measurement-toolkit.org - Anthropometry/Objective Methods/Simple Measures
                </p>
              </div>
            </PopoverContent>
          </Popover>
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
            onMetricChange(point.key, finalValue);
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
        {measurementPoints.map(point => renderMeasurement(point))}
      </div>
    </div>
  );
};

export default SkinFoldMeasurements;