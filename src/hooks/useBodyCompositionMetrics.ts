import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { 
  calculateBodyFat, 
  calculateLeanBodyMass, 
  calculateFatFreeMassIndex, 
  calculateSkeletalMuscleMass 
} from '@/utils/health/composition';

export const useBodyCompositionMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.gender) {
      console.log('Missing required metrics for body composition calculations');
      return;
    }

    try {
      const results = {
        bodyFat: calculateBodyFat(metrics),
        leanBodyMass: calculateLeanBodyMass(metrics),
        fatFreeMassIndex: calculateFatFreeMassIndex(metrics),
        skeletalMuscleMass: calculateSkeletalMuscleMass(metrics)
      };

      dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });
    } catch (error) {
      console.error('Error calculating body composition metrics:', error);
    }
  }, [
    metrics.height, 
    metrics.weight, 
    metrics.gender,
    metrics.neck, 
    metrics.waist, 
    metrics.hip,
    metrics.wrist,
    metrics.forearm,
    metrics.unit
  ]);

  return state.results;
};