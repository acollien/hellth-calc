import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useHealthCalculations } from "@/hooks/useHealthCalculations";
import HealthResults from "./HealthResults";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import Header from "./health/Header";
import Group1Results from "./health/results/Group1Results";
import Group2Results from "./health/results/Group2Results";
import Group3Results from "./health/results/Group3Results";
import Group4Results from "./health/results/Group4Results";

const initialMetrics: HealthMetrics = {
  height: "",
  weight: "",
  age: "",
  gender: "",
  neck: "",
  waist: "",
  hip: "",
  wrist: "",
  forearm: "",
  chestSkinfold: "",
  midaxillarySkinfold: "",
  suprailiacSkinfold: "",
  thighSkinfold: "",
  umbilicalSkinfold: "",
  tricepsSkinfold: "",
  subscapularSkinfold: "",
  calfSkinfold: "",
  midaxillarySkinfold2: "",
  activityLevel: "",
  unit: "metric"
};

const HealthCalculator = () => {
  const [metrics, setMetrics] = useState<HealthMetrics>(initialMetrics);
  const { results, calculateResults } = useHealthCalculations();

  const handleMetricChange = (key: keyof HealthMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
    calculateResults({ ...metrics, [key]: value });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 animate-fade-in">
      <Card className="p-6 backdrop-blur-sm bg-white/90 shadow-lg">
        <div className="space-y-8">
          <Header />

          <div className="grid gap-6">
            <BasicMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <BodyMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <SkinFoldMeasurements metrics={metrics} onMetricChange={handleMetricChange} />
            <ActivityLevel metrics={metrics} onMetricChange={handleMetricChange} />
          </div>

          {results && (
            <div className="space-y-8">
              <HealthResults results={results} />
              <Group1Results
                ponderalIndex={results.ponderalIndex}
                absi={results.absi}
                bodyRoundnessIndex={results.bodyRoundnessIndex}
                waistToHeightRatio={results.waistToHeightRatio}
                unit={metrics.unit}
              />
              <Group2Results
                leanBodyMass={results.leanBodyMass}
                fatFreeMassIndex={results.fatFreeMassIndex}
                skeletalMuscleMass={results.skeletalMuscleMass}
                bodyFatDistribution={results.bodyFatDistribution}
                unit={metrics.unit}
              />
              <Group3Results
                leanMassIndex={results.leanMassIndex}
                bodyAdiposityIndex={results.bodyAdiposityIndex}
                conicityIndex={results.conicityIndex}
                unit={metrics.unit}
              />
              {results.bmi && results.bodyFat && results.bmr && (
                <Group4Results
                  bmi={results.bmi.standard}
                  bodyFat={results.bodyFat.navy || results.bodyFat.jackson || results.bodyFat.bmiBased}
                  bmr={results.bmr.bmr}
                  unit={metrics.unit}
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;