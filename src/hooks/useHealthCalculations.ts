import { useState } from 'react';
import { HealthMetrics, HealthResult } from "@/components/health/types";
import { useBasicHealthMetrics } from './useBasicHealthMetrics';
import { useBodyComposition } from './useBodyComposition';
import { useBodyIndices } from './useBodyIndices';
import { useMetabolicRates } from './useMetabolicRates';
import {
  calculateWaistToHipRatio,
  calculateWaistToHeightRatio,
} from "@/utils/health/metrics";
import { calculateFrameSize } from "@/utils/health/metrics/frameSize";

export const useHealthCalculations = () => {
  const [results, setResults] = useState<HealthResult | null>(null);
  const { calculateBasicMetrics } = useBasicHealthMetrics();
  const { calculateComposition } = useBodyComposition();
  const { calculateIndices } = useBodyIndices();
  const { calculateMetabolicRates } = useMetabolicRates();

  const calculateResults = (currentMetrics: HealthMetrics) => {
    console.log('Starting health calculations with metrics:', currentMetrics);

    // Skip calculations if gender is not selected
    if (!currentMetrics.gender) {
      console.log('Skipping calculations - gender not selected');
      return;
    }

    // Convert imperial to metric if needed
    const metrics = { ...currentMetrics };
    if (metrics.unit === 'imperial') {
      if (metrics.height) metrics.height = `${parseFloat(metrics.height) * 2.54}`;
      if (metrics.weight) metrics.weight = `${parseFloat(metrics.weight) * 0.453592}`;
      if (metrics.neck) metrics.neck = `${parseFloat(metrics.neck) * 2.54}`;
      if (metrics.waist) metrics.waist = `${parseFloat(metrics.waist) * 2.54}`;
      if (metrics.hip) metrics.hip = `${parseFloat(metrics.hip) * 2.54}`;
      if (metrics.wrist) metrics.wrist = `${parseFloat(metrics.wrist) * 2.54}`;
    }

    // Convert string values to numbers for calculations
    const numericMetrics: any = {};
    Object.entries(metrics).forEach(([key, value]) => {
      if (key !== 'unit' && key !== 'gender' && key !== 'activityLevel') {
        numericMetrics[key] = value ? parseFloat(value) : undefined;
      } else {
        numericMetrics[key] = value;
      }
    });

    // Ensure gender is typed correctly for calculations
    const gender = metrics.gender as 'male' | 'female';
    numericMetrics.gender = gender;

    // Calculate all metrics using specialized hooks
    const basicResults = calculateBasicMetrics(metrics);
    const compositionResults = calculateComposition(metrics);
    const indicesResults = calculateIndices(metrics);
    const metabolicResults = calculateMetabolicRates(metrics);

    // Calculate frame size
    const frameSize = calculateFrameSize({
      height: numericMetrics.height,
      wrist: numericMetrics.wrist,
      gender,
      unit: metrics.unit
    });

    console.log('Calculated frame size:', frameSize);

    // Calculate additional ratios
    const additionalResults: any = {};
    if (metrics.waist && metrics.height) {
      additionalResults.waistToHeightRatio = calculateWaistToHeightRatio(
        parseFloat(metrics.waist),
        parseFloat(metrics.height)
      );
    }

    if (metrics.waist && metrics.hip) {
      additionalResults.waistToHip = calculateWaistToHipRatio(metrics);
    }

    // Combine all results
    const combinedResults = {
      ...basicResults,
      ...compositionResults,
      ...indicesResults,
      ...metabolicResults,
      ...additionalResults,
      frameSize
    };

    console.log('Final combined results:', combinedResults);
    setResults(combinedResults);
  };

  return { results, calculateResults };
};