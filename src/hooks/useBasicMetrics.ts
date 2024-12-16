import { useState } from 'react';
import { HealthMetrics, HealthResult } from "@/utils/health/types";
import {
  calculateBMI,
  calculateIdealWeight,
  calculateBiologicalAge,
} from "@/utils/health/calculations";

export const useBasicMetrics = () => {
  const [results, setResults] = useState<HealthResult | null>(null);

  const calculateBasicMetrics = (metrics: HealthMetrics) => {
    console.log('Calculating basic health metrics:', metrics);
    
    const numericMetrics: HealthMetrics = {
      ...metrics,
      height: Number(metrics.height),
      weight: Number(metrics.weight),
      age: metrics.age ? Number(metrics.age) : undefined,
      neck: metrics.neck ? Number(metrics.neck) : undefined,
      waist: metrics.waist ? Number(metrics.waist) : undefined,
      hip: metrics.hip ? Number(metrics.hip) : undefined,
      wrist: metrics.wrist ? Number(metrics.wrist) : undefined,
      forearm: metrics.forearm ? Number(metrics.forearm) : undefined,
    };

    const results: HealthResult = {};

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