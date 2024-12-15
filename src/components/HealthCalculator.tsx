import { useState } from "react";
import { Card } from "@/components/ui/card";
import * as healthCalc from "@/utils/healthCalculations";
import HealthResults from "./HealthResults";
import BasicMeasurements from "./health/BasicMeasurements";
import BodyMeasurements from "./health/BodyMeasurements";
import SkinFoldMeasurements from "./health/SkinFoldMeasurements";
import ActivityLevel from "./health/ActivityLevel";
import { HealthMetrics } from "./health/types";
import Header from "./health/Header";
import Group1Results from "./health/results/Group1Results";

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
  const [results, setResults] = useState<any>(null);

  const handleMetricChange = (key: keyof HealthMetrics, value: string) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
    calculateResults({ ...metrics, [key]: value });
  };

  const calculateResults = (currentMetrics: HealthMetrics) => {
    const numericMetrics: any = {};
    Object.entries(currentMetrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const results: any = {};

    // Convert imperial to metric if needed
    if (currentMetrics.unit === 'imperial') {
      if (numericMetrics.height) numericMetrics.height *= 2.54;
      if (numericMetrics.weight) numericMetrics.weight *= 0.453592;
      if (numericMetrics.neck) numericMetrics.neck *= 2.54;
      if (numericMetrics.waist) numericMetrics.waist *= 2.54;
      if (numericMetrics.hip) numericMetrics.hip *= 2.54;
      if (numericMetrics.wrist) numericMetrics.wrist *= 2.54;
    }

    // Calculate existing metrics
    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = healthCalc.calculateBMI(numericMetrics.height, numericMetrics.weight);
    }

    if (numericMetrics.gender) {
      results.bodyFat = healthCalc.calculateBodyFat(numericMetrics);
      results.idealWeight = healthCalc.calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
    }

    results.bmr = healthCalc.calculateBMR(numericMetrics);
    results.frameSize = healthCalc.calculateFrameSize(numericMetrics);
    results.waistToHip = healthCalc.calculateWaistToHip(numericMetrics);
    results.biologicalAge = healthCalc.calculateBiologicalAge(numericMetrics);

    // Calculate new Group 1 metrics
    if (numericMetrics.height && numericMetrics.weight) {
      results.ponderalIndex = healthCalc.calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    if (numericMetrics.height && numericMetrics.weight && numericMetrics.waist) {
      results.absi = healthCalc.calculateABSI(
        numericMetrics.waist,
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    if (numericMetrics.height && numericMetrics.waist) {
      results.bodyRoundnessIndex = healthCalc.calculateBodyRoundnessIndex(
        numericMetrics.waist,
        numericMetrics.height,
        currentMetrics.unit
      );
      results.waistToHeightRatio = healthCalc.calculateWaistToHeightRatio(
        numericMetrics.waist,
        numericMetrics.height
      );
    }

    setResults(results);
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
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;
