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

    // Only proceed if gender is male or female (not empty string)
    if (metrics.gender !== 'male' && metrics.gender !== 'female') {
      console.log('Gender must be either male or female');
      return;
    }

    try {
      // Convert string metrics to numbers
      const height = parseFloat(metrics.height);
      const weight = parseFloat(metrics.weight);
      const age = parseFloat(metrics.age);

      // Create numeric metrics object with valid gender type
      const numericMetrics = {
        ...metrics,
        height,
        weight,
        age,
        gender: metrics.gender as 'male' | 'female' // Type assertion since we checked above
      };

      // Calculate BMI with numeric values and unit
      const bmiResults = calculateBMI(numericMetrics, metrics.unit);

      // Calculate ideal weight with numeric values and unit
      const idealWeightResults = calculateIdealWeight(numericMetrics, metrics.unit);

      // Calculate biological age
      const biologicalAge = calculateBiologicalAge(numericMetrics);

      // Create complete results object with all required properties
      const newResults = {
        bmi: bmiResults,
        idealWeight: {
          ...idealWeightResults,
          athletic: typeof idealWeightResults.athletic === 'number' ? idealWeightResults.athletic : 0,
          bmiBased: typeof idealWeightResults.bmiBased === 'number' ? idealWeightResults.bmiBased : 0,
          robinson: idealWeightResults.robinson,
          miller: idealWeightResults.miller,
          devine: idealWeightResults.devine
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