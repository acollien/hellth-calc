import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { 
  calculateABSI, 
  calculateBodyRoundnessIndex, 
  calculatePonderalIndex,
  calculateBodyAdiposityIndex,
  calculateConicityIndex 
} from '@/utils/health/indices';

export const useBodyIndicesMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.waist) return;

    const height = parseFloat(metrics.height);
    const weight = parseFloat(metrics.weight);
    const waist = parseFloat(metrics.waist);

    const results = {
      absi: calculateABSI(waist, height, weight, metrics.unit),
      bodyRoundnessIndex: calculateBodyRoundnessIndex(waist, height, metrics.unit),
      ponderalIndex: calculatePonderalIndex(height, weight, metrics.unit),
      bodyAdiposityIndex: calculateBodyAdiposityIndex(metrics),
      conicityIndex: calculateConicityIndex(metrics)
    };

    dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });
  }, [metrics.height, metrics.weight, metrics.waist, metrics.hip, metrics.unit]);

  return state.results;
};