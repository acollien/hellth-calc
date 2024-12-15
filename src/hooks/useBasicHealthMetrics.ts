import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateBMI,
  calculateIdealWeight,
  calculateBiologicalAge,
} from "@/utils/health/calculations";

export const useBasicHealthMetrics = () => {
  const [results, setResults] = useState<any>(null);

  const calculateBasicMetrics = (metrics: HealthMetrics) => {
    console.log('Calculating basic health metrics:', metrics);
    
    const numericMetrics: any = {};
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const results: any = {};

    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
    }

    if (numericMetrics.gender && numericMetrics.height) {
      results.idealWeight = calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
    }

    results.biologicalAge = calculateBiologicalAge(numericMetrics);

    console.log('Basic metrics results:', results);
    setResults(results);
    return results;
  };

  return { results, calculateBasicMetrics };
};