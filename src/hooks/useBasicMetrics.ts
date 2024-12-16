import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateBMI,
  calculateIdealWeight,
  calculateBiologicalAge,
} from "@/utils/health/calculations";

export const useBasicMetrics = () => {
  const [results, setResults] = useState<any>(null);

  const calculateBasicMetrics = (metrics: HealthMetrics) => {
    console.log('Calculating basic health metrics:', metrics);
    
    // Convert string values to numbers for calculations
    const numericMetrics = {
      height: metrics.height ? parseFloat(metrics.height) : 0,
      weight: metrics.weight ? parseFloat(metrics.weight) : 0,
      age: metrics.age ? parseFloat(metrics.age) : 0,
      gender: metrics.gender,
      unit: metrics.unit
    };

    const results: any = {};

    if (numericMetrics.height && numericMetrics.weight) {
      results.bmi = calculateBMI(numericMetrics.height, numericMetrics.weight);
    }

    if (numericMetrics.gender && numericMetrics.height) {
      results.idealWeight = {
        ...calculateIdealWeight(numericMetrics.height, numericMetrics.gender),
        athletic: 0, // Add missing properties
        bmiBased: 0  // Add missing properties
      };
    }

    results.biologicalAge = calculateBiologicalAge(numericMetrics);

    console.log('Basic metrics results:', results);
    return results;
  };

  return { results, calculateBasicMetrics };
};