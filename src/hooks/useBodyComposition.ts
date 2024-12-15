import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateBodyFat,
  calculateLeanBodyMass,
  calculateFatFreeMassIndex,
  calculateSkeletalMuscleMass,
} from "@/utils/health/composition";

export const useBodyComposition = () => {
  const [results, setResults] = useState<any>(null);

  const calculateComposition = (metrics: HealthMetrics) => {
    console.log('Calculating body composition:', metrics);
    
    const numericMetrics: any = {};
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const results: any = {};

    if (numericMetrics.gender) {
      results.bodyFat = calculateBodyFat(numericMetrics);
    }

    results.leanBodyMass = calculateLeanBodyMass(numericMetrics);
    results.fatFreeMassIndex = calculateFatFreeMassIndex(numericMetrics);
    results.skeletalMuscleMass = calculateSkeletalMuscleMass(numericMetrics);

    console.log('Body composition results:', results);
    setResults(results);
    return results;
  };

  return { results, calculateComposition };
};