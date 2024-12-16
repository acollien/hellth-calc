import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { calculateBMI, calculateIdealWeight, calculateBiologicalAge } from '@/utils/health/calculations';

export const useBasicMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight) return;

    const height = parseFloat(metrics.height);
    const weight = parseFloat(metrics.weight);

    const results = {
      bmi: calculateBMI(height, weight),
      idealWeight: metrics.gender ? calculateIdealWeight(height, metrics.gender) : undefined,
      biologicalAge: calculateBiologicalAge(metrics)
    };

    dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });
  }, [metrics.height, metrics.weight, metrics.gender, metrics.age]);

  return state.results;
};