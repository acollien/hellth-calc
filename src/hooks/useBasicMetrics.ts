import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { calculateBMI } from '@/utils/health/calculations/bmi';
import { calculateIdealWeight } from '@/utils/health/calculations/idealWeight';
import { calculateBiologicalAge } from '@/utils/health/calculations/biologicalAge';

export const useBasicMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
      console.log('Missing required metrics for basic calculations');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const age = parseFloat(metrics.age);

      const bmi = calculateBMI(height, weight);
      const idealWeight = calculateIdealWeight(height, metrics.gender);
      const biologicalAge = calculateBiologicalAge({
        height,
        weight,
        age,
        gender: metrics.gender,
        neck: metrics.neck ? parseFloat(metrics.neck) : undefined,
        waist: metrics.waist ? parseFloat(metrics.waist) : undefined,
        hip: metrics.hip ? parseFloat(metrics.hip) : undefined,
        wrist: metrics.wrist ? parseFloat(metrics.wrist) : undefined,
        forearm: metrics.forearm ? parseFloat(metrics.forearm) : undefined,
        unit: metrics.unit
      });

      const newResults = {
        ...state.results,
        bmi,
        idealWeight: {
          ...idealWeight,
          athletic: 0, // Adding required properties with default values
          bmiBased: 0
        },
        biologicalAge
      };

      dispatch({ type: 'SET_RESULTS', results: newResults });
    } catch (error) {
      console.error('Error calculating basic metrics:', error);
    }
  }, [metrics.height, metrics.weight, metrics.age, metrics.gender, metrics.unit]);

  return state.results;
};

export default useBasicMetrics;