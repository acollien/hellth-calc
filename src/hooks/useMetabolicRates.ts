import { useState } from 'react';
import { HealthMetrics } from "@/components/health/types";
import { calculateBMR } from "@/utils/health/calculations";

export const useMetabolicRates = () => {
  const [results, setResults] = useState<any>(null);

  const calculateMetabolicRates = (metrics: HealthMetrics) => {
    console.log('Calculating metabolic rates:', metrics);
    
    const numericMetrics: any = {};
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    const results = {
      bmr: calculateBMR(numericMetrics)
    };

    console.log('Metabolic rates results:', results);
    setResults(results);
    return results;
  };

  return { results, calculateMetabolicRates };
};