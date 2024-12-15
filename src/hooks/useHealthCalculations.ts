import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import * as basicCalc from "@/utils/health/basicCalculations";
import * as bodyComp from "@/utils/health/bodyCompositionCalc";
import * as metabolicCalc from "@/utils/health/metabolicCalc";
import * as advancedMetrics from "@/utils/health/advancedMetrics";

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

    // Calculate basic indices
    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = basicCalc.calculateBMI(numericMetrics.height, numericMetrics.weight);
      results.ponderalIndex = basicCalc.calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
      results.absi = basicCalc.calculateABSI(
        numericMetrics.waist,
        numericMetrics.height,
        numericMetrics.weight,
        currentMetrics.unit
      );
    }

    // Calculate body composition metrics
    if (numericMetrics.gender) {
      results.bodyFat = bodyComp.calculateBodyFat(numericMetrics);
      if (numericMetrics.height) {
        results.idealWeight = bodyComp.calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
      }
    }

    // Calculate metabolic metrics
    results.bmr = metabolicCalc.calculateBMR(numericMetrics);

    // Calculate advanced metrics
    if (numericMetrics.waist && numericMetrics.height) {
      results.bodyRoundnessIndex = advancedMetrics.calculateBodyRoundnessIndex(
        numericMetrics.waist,
        numericMetrics.height,
        currentMetrics.unit
      );
      results.waistToHeightRatio = advancedMetrics.calculateWaistToHeightRatio(
        numericMetrics.waist,
        numericMetrics.height
      );
    }

    results.biologicalAge = advancedMetrics.calculateBiologicalAge(numericMetrics);

    console.log('Calculated results:', results);
    setResults(results);
  };

  return { results, calculateResults };
};