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

      console.log('Calculating basic metrics with:', { height, weight, age, gender: metrics.gender });

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

      console.log('Calculated results:', { bmi, idealWeight, biologicalAge });

      const newResults = {
        ...state.results,
        bmi,
        idealWeight,
        biologicalAge
      };

      dispatch({ type: 'SET_RESULTS', results: newResults });
    } catch (error) {
      console.error('Error calculating basic metrics:', error);
    }
  }, [metrics.height, metrics.weight, metrics.age, metrics.gender, metrics.unit]);

  return state.results;
};