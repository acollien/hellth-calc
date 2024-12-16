import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import {
  calculateABSI,
  calculateBodyRoundnessIndex,
  calculatePonderalIndex,
  calculateBodyAdiposityIndex,
  calculateConicityIndex,
} from "@/utils/health/indices";
import { calculateWaistToHipRatio, calculateWaistToHeightRatio } from "@/utils/health/metrics";

export const useBodyIndicesMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    console.log('Calculating body indices with metrics:', metrics);

    if (!metrics.height || !metrics.weight) {
      console.log('Missing required metrics for indices calculations');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);

      const results: any = {};

      // Calculate Ponderal Index
      results.ponderalIndex = calculatePonderalIndex(height, weight, metrics.unit);

      // Calculate ABSI and BRI if waist measurement is available
      if (metrics.waist) {
        const waist = parseFloat(metrics.waist);
        results.absi = calculateABSI(waist, height, weight, metrics.unit);
        results.bodyRoundnessIndex = calculateBodyRoundnessIndex(waist, height, metrics.unit);
      }

      // Calculate Body Adiposity Index if hip measurement is available
      if (metrics.hip) {
        results.bodyAdiposityIndex = calculateBodyAdiposityIndex(metrics);
      }

      // Calculate Conicity Index
      results.conicityIndex = calculateConicityIndex(metrics);

      // Calculate Waist-to-Hip Ratio if both measurements are available
      if (metrics.waist && metrics.hip) {
        results.waistToHip = calculateWaistToHipRatio(metrics);
      }

      // Calculate Waist-to-Height Ratio if both measurements are available
      if (metrics.waist && metrics.height) {
        results.waistToHeightRatio = calculateWaistToHeightRatio(
          parseFloat(metrics.waist),
          parseFloat(metrics.height)
        );
      }

      console.log('Body indices calculation results:', results);
      
      const newResults = {
        ...state.results,
        ...results
      };

      dispatch({ type: 'SET_RESULTS', results: newResults });

    } catch (error) {
      console.error('Error calculating body indices:', error);
    }
  }, [
    metrics.height,
    metrics.weight,
    metrics.waist,
    metrics.hip,
    metrics.unit,
    metrics.gender
  ]);

  return state.results;
};