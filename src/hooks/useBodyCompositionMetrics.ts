import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { 
  calculateBodyFat, 
  calculateLeanBodyMass, 
  calculateFatFreeMassIndex, 
  calculateSkeletalMuscleMass,
  calculateBodyFatDistribution
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
      const bodyFat = calculateBodyFat(metrics);
      const leanBodyMass = calculateLeanBodyMass(metrics);
      const fatFreeMassIndex = calculateFatFreeMassIndex(metrics);
      const skeletalMuscleMass = calculateSkeletalMuscleMass(metrics);
      const bodyFatDistribution = calculateBodyFatDistribution(metrics);

      const results = {
        bodyFat,
        leanBodyMass,
        fatFreeMassIndex,
        skeletalMuscleMass,
        bodyFatDistribution
      };

      console.log('Body composition calculation results:', results);

      dispatch({ 
        type: 'SET_RESULTS', 
        results: { ...state.results, ...results } 
      });
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