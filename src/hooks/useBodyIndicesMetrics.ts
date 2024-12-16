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
import { calculateFrameSize } from "@/utils/health/metrics/frameSize";

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
        results.waistToHeightRatio = calculateWaistToHeightRatio(waist, height);
      }

      if (metrics.hip) {
        results.bodyAdiposityIndex = calculateBodyAdiposityIndex(metrics);
      }

      if (metrics.waist && metrics.hip) {
        results.waistToHip = calculateWaistToHipRatio(metrics);
      }

      results.conicityIndex = calculateConicityIndex(metrics);

      if (metrics.wrist && metrics.gender) {
        results.frameSize = calculateFrameSize({
          height,
          wrist: parseFloat(metrics.wrist),
          gender: metrics.gender,
          unit: metrics.unit
        });
      }

      console.log('Body indices calculation results:', results);

      dispatch({ 
        type: 'SET_RESULTS', 
        results: { ...state.results, ...results } 
      });

    } catch (error) {
      console.error('Error calculating body indices:', error);
    }
  }, [
    metrics.height,
    metrics.weight,
    metrics.waist,
    metrics.hip,
    metrics.wrist,
    metrics.unit,
    metrics.gender
  ]);

  return state.results;
};