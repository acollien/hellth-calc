import { useState } from "react";
import { Card } from "@/components/ui/card";
import * as basicIndices from "@/utils/health/basicIndices";
import * as bodyComposition from "@/utils/health/bodyComposition";
import * as metabolicCalc from "@/utils/health/metabolicCalculations";
import * as otherMetrics from "@/utils/health/otherMetrics";
import * as advancedMetrics from "@/utils/health/advancedMetrics";
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

    // Calculate basic indices
    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = basicIndices.calculateBMI(numericMetrics.height, numericMetrics.weight);
      results.ponderalIndex = basicIndices.calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    if (numericMetrics.height && numericMetrics.weight && numericMetrics.waist) {
      results.absi = basicIndices.calculateABSI(
        numericMetrics.waist,
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    if (numericMetrics.height && numericMetrics.waist) {
      results.bodyRoundnessIndex = basicIndices.calculateBodyRoundnessIndex(
        numericMetrics.waist,
        numericMetrics.height,
        currentMetrics.unit
      );
      results.waistToHeightRatio = basicIndices.calculateWaistToHeightRatio(
        numericMetrics.waist,
        numericMetrics.height
      );
    }

    // Calculate body composition metrics
    if (numericMetrics.gender) {
      results.bodyFat = bodyComposition.calculateBodyFat(numericMetrics);
      results.leanBodyMass = bodyComposition.calculateLeanBodyMass(numericMetrics);
      results.fatFreeMassIndex = bodyComposition.calculateFatFreeMassIndex(numericMetrics);
      results.skeletalMuscleMass = bodyComposition.calculateSkeletalMuscleMass(numericMetrics);
      results.bodyFatDistribution = bodyComposition.calculateBodyFatDistributionIndex(numericMetrics);
    }

    // Calculate metabolic and other metrics
    results.bmr = metabolicCalc.calculateBMR(numericMetrics);
    results.frameSize = otherMetrics.calculateFrameSize(numericMetrics);
    results.waistToHip = otherMetrics.calculateWaistToHip(numericMetrics);
    results.biologicalAge = otherMetrics.calculateBiologicalAge(numericMetrics);

    // Calculate advanced metrics
    results.leanMassIndex = advancedMetrics.calculateLeanMassIndex(numericMetrics);
    results.bodyAdiposityIndex = advancedMetrics.calculateBodyAdiposityIndex(numericMetrics);
    results.conicityIndex = advancedMetrics.calculateConicityIndex(numericMetrics);

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
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default HealthCalculator;
