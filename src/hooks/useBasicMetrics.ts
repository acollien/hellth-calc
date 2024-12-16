import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { calculateBMI } from '@/utils/health/calculations/bmi';
import { calculateIdealWeight } from '@/utils/health/calculations/idealWeight';
import { calculateBiologicalAge } from '@/utils/health/calculations/biologicalAge';
import { HealthMetrics } from '@/components/health/types';
import { BaseHealthMetrics } from '@/utils/health/types';

export const useBasicMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
      console.log('Missing required metrics for basic calculations');
      return;
    }

    if (metrics.gender !== 'male' && metrics.gender !== 'female') {
      console.log('Gender must be either male or female');
      return;
    }

    try {
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const age = parseFloat(metrics.age);

      console.log('Calculating metrics with:', { height, weight, age, gender: metrics.gender });

      const bmi = calculateBMI(height, weight);
      console.log('BMI calculated:', bmi);

      const idealWeight = calculateIdealWeight(height, metrics.gender);
      console.log('Ideal weight calculated:', idealWeight);

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
      console.log('Biological age calculated:', biologicalAge);

      const newResults = {
        bmi,
        idealWeight: {
          ...idealWeight,
          athletic: idealWeight.robinson * 0.9,
          bmiBased: idealWeight.robinson
        },
        biologicalAge
      };

      console.log('Dispatching new results:', newResults);
      
      dispatch({ 
        type: 'SET_RESULTS', 
        results: { 
          ...state.results,
          ...newResults
        } 
      });
    } catch (error) {
      console.error('Error calculating basic metrics:', error);
    }
  }, [metrics.height, metrics.weight, metrics.age, metrics.gender, metrics.unit]);

  return state.results;
};