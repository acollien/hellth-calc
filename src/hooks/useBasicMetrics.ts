import { useEffect } from 'react';
import { useHealth } from '@/contexts/HealthContext';
import { calculateBMI } from '@/utils/health/calculations/bmi';
import { calculateIdealWeight } from '@/utils/health/calculations/idealWeight';
import { calculateBiologicalAge } from '@/utils/health/calculations/biologicalAge';
import { HealthMetrics } from '@/components/health/types';

export const useBasicMetrics = () => {
  const { state, dispatch } = useHealth();
  const { metrics } = state;

  useEffect(() => {
    if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
      console.log('Missing required metrics for basic calculations');
      return;
    }

    try {
      // Convert string metrics to numbers while maintaining the string type in the metrics object
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const age = parseFloat(metrics.age);

      // Calculate BMI with numeric values
      const bmiResults = calculateBMI({
        ...metrics,
        height,
        weight,
        age
      });

      // Calculate ideal weight with numeric values
      const idealWeightResults = calculateIdealWeight({
        ...metrics,
        height,
        weight,
        age
      });

      // Calculate biological age with numeric values
      const biologicalAge = calculateBiologicalAge({
        ...metrics,
        height,
        weight,
        age
      });

      // Create complete results object
      const newResults = {
        bmi: bmiResults,
        idealWeight: {
          ...idealWeightResults,
          athletic: idealWeightResults.athletic || 0,
          bmiBased: idealWeightResults.bmiBased || 0
        },
        biologicalAge
      };

      console.log('Basic metrics calculated:', newResults);
      
      // Merge new results with existing results instead of replacing them
      dispatch({ 
        type: 'SET_RESULTS', 
        results: { 
          ...state.results, // Keep existing results
          ...newResults     // Add/update new results
        } 
      });
    } catch (error) {
      console.error('Error calculating basic metrics:', error);
    }
  }, [metrics.height, metrics.weight, metrics.age, metrics.gender, metrics.unit]);

  return state.results;
};