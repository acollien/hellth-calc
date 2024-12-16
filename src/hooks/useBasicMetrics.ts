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
      // Calculate BMI using numeric values
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const bmiResults = calculateBMI(height, weight);

      // Calculate ideal weight
      const baseIdealWeight = calculateIdealWeight(height, metrics.gender);

      // Calculate biological age
      const biologicalAge = calculateBiologicalAge({
        height: parseFloat(metrics.height),
        weight: parseFloat(metrics.weight),
        age: parseFloat(metrics.age),
        gender: metrics.gender,
        neck: metrics.neck ? parseFloat(metrics.neck) : 0,
        waist: metrics.waist ? parseFloat(metrics.waist) : 0,
        hip: metrics.hip ? parseFloat(metrics.hip) : 0,
        wrist: metrics.wrist ? parseFloat(metrics.wrist) : 0,
        forearm: metrics.forearm ? parseFloat(metrics.forearm) : 0,
        unit: metrics.unit
      });

      // Create complete results object
      const newResults = {
        bmi: bmiResults,
        idealWeight: {
          ...baseIdealWeight,
          athletic: baseIdealWeight.robinson * 0.9,
          bmiBased: baseIdealWeight.robinson
        },
        biologicalAge
      };

      console.log('Basic metrics calculated:', newResults);
      
      // Merge new results with existing results
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