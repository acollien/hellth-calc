import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateBMI,
  calculateBodyFat,
  calculateBMR,
  calculateIdealWeight,
  calculateBiologicalAge,
  calculatePonderalIndex,
  calculateABSI,
  calculateBodyRoundnessIndex,
  calculateWaistToHeightRatio
} from "@/utils/health/calculations";

export const useHealthCalculations = () => {
  const [results, setResults] = useState<any>(null);

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

    // Calculate all metrics
    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
      results.ponderalIndex = calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
      results.absi = calculateABSI(
        numericMetrics.waist,
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    if (numericMetrics.gender) {
      results.bodyFat = calculateBodyFat(numericMetrics);
      if (numericMetrics.height) {
        results.idealWeight = calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
      }
    }

    results.bmr = calculateBMR(numericMetrics);

    if (numericMetrics.waist && numericMetrics.height) {
      results.bodyRoundnessIndex = calculateBodyRoundnessIndex(
        numericMetrics.waist,
        numericMetrics.height,
        currentMetrics.unit
      );
      results.waistToHeightRatio = calculateWaistToHeightRatio(
        numericMetrics.waist,
        numericMetrics.height
      );
    }

    results.biologicalAge = calculateBiologicalAge(numericMetrics);

    console.log('Calculated results:', results);
    setResults(results);
  };

  return { results, calculateResults };
};