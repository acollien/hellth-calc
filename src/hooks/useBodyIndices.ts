import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import {
  calculateABSI,
  calculateBodyRoundnessIndex,
  calculatePonderalIndex,
  calculateBodyAdiposityIndex,
  calculateConicityIndex,
} from "@/utils/health/indices";

export const useBodyIndices = () => {
  const [results, setResults] = useState<any>(null);

  const calculateIndices = (metrics: HealthMetrics) => {
    console.log('Calculating body indices:', metrics);
    
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
      results.ponderalIndex = calculatePonderalIndex(
        numericMetrics.height,
        numericMetrics.weight,
        metrics.unit
      );
      
      if (numericMetrics.waist) {
        results.absi = calculateABSI(
          numericMetrics.waist,
          numericMetrics.height,
          numericMetrics.weight,
          metrics.unit
        );
        
        results.bodyRoundnessIndex = calculateBodyRoundnessIndex(
          numericMetrics.waist,
          numericMetrics.height,
          metrics.unit
        );
      }
    }

    results.bodyAdiposityIndex = calculateBodyAdiposityIndex(numericMetrics);
    results.conicityIndex = calculateConicityIndex(numericMetrics);

    console.log('Body indices results:', results);
    setResults(results);
    return results;
  };

  return { results, calculateIndices };
};