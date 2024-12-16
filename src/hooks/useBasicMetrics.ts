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
      const numericMetrics = {
        ...metrics,
        height: metrics.height,
        weight: metrics.weight,
        age: metrics.age,
        neck: metrics.neck || '',
        waist: metrics.waist || '',
        hip: metrics.hip || '',
        wrist: metrics.wrist || '',
        forearm: metrics.forearm || ''
      };

      const bmi = calculateBMI(parseFloat(metrics.height), parseFloat(metrics.weight));
      const idealWeight = calculateIdealWeight(parseFloat(metrics.height), metrics.gender);
      const biologicalAge = calculateBiologicalAge(numericMetrics);

      const newResults = {
        ...state.results,
        bmi,
        idealWeight: {
          ...idealWeight,
          athletic: 0,
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