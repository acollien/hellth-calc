import { useState } from 'react';
import * as basicIndices from "@/utils/health/basicIndices";
import * as bodyComposition from "@/utils/health/bodyComposition";
import * as metabolicCalc from "@/utils/health/metabolicCalculations";
import * as otherMetrics from "@/utils/health/otherMetrics";
import * as advancedMetrics from "@/utils/health/advancedMetrics";
import { HealthMetrics } from "@/components/health/types";

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

  return { results, calculateResults };
};