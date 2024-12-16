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
    if (!metrics.height || !metrics.weight) {
      console.log('Missing required metrics for indices calculations');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);

      const results: any = {};

      results.ponderalIndex = calculatePonderalIndex(height, weight, metrics.unit);

      if (metrics.waist) {
        const waist = parseFloat(metrics.waist);
        results.absi = calculateABSI(waist, height, weight, metrics.unit);
        results.bodyRoundnessIndex = calculateBodyRoundnessIndex(waist, height, metrics.unit);
      }

      if (metrics.hip) {
        results.bodyAdiposityIndex = calculateBodyAdiposityIndex(metrics);
      }

      results.conicityIndex = calculateConicityIndex(metrics);

      if (metrics.waist && metrics.hip) {
        results.waistToHip = calculateWaistToHipRatio(metrics);
      }

      if (metrics.waist && metrics.height) {
        results.waistToHeightRatio = calculateWaistToHeightRatio(
          parseFloat(metrics.waist),
          parseFloat(metrics.height)
        );
      }

      dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });

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