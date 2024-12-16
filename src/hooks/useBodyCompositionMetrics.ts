import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { calculateBodyFat, calculateLeanBodyMass, calculateFatFreeMassIndex, calculateSkeletalMuscleMass } from '@/utils/health/composition';

export const useBodyCompositionMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight) return;

    const results = {
      bodyFat: calculateBodyFat(metrics),
      leanBodyMass: calculateLeanBodyMass(metrics),
      fatFreeMassIndex: calculateFatFreeMassIndex(metrics),
      skeletalMuscleMass: calculateSkeletalMuscleMass(metrics)
    };

    dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });
  }, [metrics.height, metrics.weight, metrics.neck, metrics.waist, metrics.hip]);

  return state.results;
};