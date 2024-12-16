import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { 
  calculateABSI, 
  calculateBodyRoundnessIndex, 
  calculatePonderalIndex,
  calculateBodyAdiposityIndex,
  calculateConicityIndex
} from '@/utils/health/indices';
import {
  calculateWaistToHeightRatio,
  calculateWaistToHipRatio
} from '@/utils/health/metrics';
import { IndicesResults } from '@/utils/health/types';

export const useBodyIndicesMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.waist) {
      console.log('Missing required metrics for body indices calculations');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const waist = parseFloat(metrics.waist);

      const results: IndicesResults = {
        absi: calculateABSI(waist, height, weight, metrics.unit),
        bodyRoundnessIndex: calculateBodyRoundnessIndex(waist, height, metrics.unit),
        ponderalIndex: calculatePonderalIndex(height, weight, metrics.unit),
        bodyAdiposityIndex: calculateBodyAdiposityIndex(metrics),
        conicityIndex: calculateConicityIndex(metrics)
      };

      if (metrics.waist && metrics.height) {
        results.waistToHeightRatio = calculateWaistToHeightRatio(waist, height);
      }

      if (metrics.waist && metrics.hip) {
        results.waistToHip = calculateWaistToHipRatio(metrics);
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
    metrics.unit
  ]);

  return state.results;
};