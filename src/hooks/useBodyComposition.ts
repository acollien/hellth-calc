import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateBodyFat,
  calculateLeanBodyMass,
  calculateFatFreeMassIndex,
  calculateSkeletalMuscleMass,
  calculateComposition
} from "@/utils/health/composition";

export const useBodyComposition = () => {
  const [results, setResults] = useState<any>(null);

  const calculateCompositionMetrics = (metrics: HealthMetrics) => {
    console.log('Calculating body composition:', metrics);
    
    const numericMetrics: any = {};
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const compositionResults = calculateComposition(numericMetrics);
    console.log('Composition results:', compositionResults);
    
    const results: any = {
      ...compositionResults,
      bodyFat: calculateBodyFat(numericMetrics),
      leanBodyMass: calculateLeanBodyMass(numericMetrics),
      fatFreeMassIndex: calculateFatFreeMassIndex(numericMetrics),
      skeletalMuscleMass: calculateSkeletalMuscleMass(numericMetrics),
    };

    console.log('Final body composition results:', results);
    setResults(results);
    return results;
  };

  return { results, calculateComposition: calculateCompositionMetrics };
};