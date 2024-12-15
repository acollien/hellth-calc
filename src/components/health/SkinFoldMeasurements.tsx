import { HealthMetrics } from "./types";
import SkinfoldPoint from "./SkinfoldPoint";

interface SkinFoldMeasurementsProps {
  metrics: HealthMetrics;
  onMetricChange: (key: keyof HealthMetrics, value: string) => void;
}

const SkinFoldMeasurements = ({ metrics, onMetricChange }: SkinFoldMeasurementsProps) => {
  const measurementPoints = [
    { 
      label: "Chest",
      key: "chestSkinfold" as keyof HealthMetrics,
      point: "a",
      tooltip: "Diagonal fold on the chest"
    },
    { 
      label: "Midaxillary (Upper)",
      key: "midaxillarySkinfold" as keyof HealthMetrics,
      point: "b",
      tooltip: "Vertical fold on the midaxillary line at nipple level"
    },
    { 
      label: "Suprailiac",
      key: "suprailiacSkinfold" as keyof HealthMetrics,
      point: "c",
      tooltip: "Diagonal fold above the iliac crest"
    },
    { 
      label: "Thigh",
      key: "thighSkinfold" as keyof HealthMetrics,
      point: "d",
      tooltip: "Vertical fold on the front of the thigh"
    },
    { 
      label: "Umbilical",
      key: "umbilicalSkinfold" as keyof HealthMetrics,
      point: "e",
      tooltip: "Vertical fold 2cm right of the umbilicus"
    },
    { 
      label: "Triceps",
      key: "tricepsSkinfold" as keyof HealthMetrics,
      point: "f",
      tooltip: "Vertical fold on the back of the upper arm"
    },
    { 
      label: "Midaxillary (Lower)",
      key: "midaxillarySkinfold2" as keyof HealthMetrics,
      point: "g",
      tooltip: "Vertical fold on the midaxillary line at the level of the xiphoid process"
    },
    { 
      label: "Subscapular",
      key: "subscapularSkinfold" as keyof HealthMetrics,
      point: "h",
      tooltip: "Diagonal fold below the shoulder blade"
    },
    { 
      label: "Calf",
      key: "calfSkinfold" as keyof HealthMetrics,
      point: "i",
      tooltip: "Vertical fold on the medial side of the calf"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-mint-800">Skinfold Measurements</h3>
      <div className="grid gap-6 sm:grid-cols-3">
        {measurementPoints.map((point) => (
          <SkinfoldPoint
            key={point.key}
            label={point.label}
            value={metrics[point.key]}
            point={point.point}
            tooltip={point.tooltip}
            onChange={(value) => onMetricChange(point.key, value)}
            unit={metrics.unit}
          />
        ))}
      </div>
    </div>
  );
};

export default SkinFoldMeasurements;