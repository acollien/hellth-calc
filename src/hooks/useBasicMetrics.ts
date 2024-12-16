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
      const rawIdealWeight = calculateIdealWeight(height, metrics.gender);
      
      // Add missing athletic and bmiBased properties
      const idealWeight = {
        ...rawIdealWeight,
        athletic: rawIdealWeight.robinson * 0.95, // Athletic ideal weight is typically 5% less
        bmiBased: weight // Using current weight as bmiBased for now
      };

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