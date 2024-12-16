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
      // Convert all string measurements to numbers
      const numericMetrics: HealthMetrics = {
        ...metrics,
        height: parseFloat(metrics.height),
        weight: parseFloat(metrics.weight),
        age: parseFloat(metrics.age),
        neck: parseFloat(metrics.neck || '0'),
        waist: parseFloat(metrics.waist || '0'),
        hip: parseFloat(metrics.hip || '0'),
        wrist: parseFloat(metrics.wrist || '0'),
        forearm: parseFloat(metrics.forearm || '0'),
        chestSkinfold: parseFloat(metrics.chestSkinfold || '0'),
        midaxillarySkinfold: parseFloat(metrics.midaxillarySkinfold || '0'),
        suprailiacSkinfold: parseFloat(metrics.suprailiacSkinfold || '0'),
        thighSkinfold: parseFloat(metrics.thighSkinfold || '0'),
        umbilicalSkinfold: parseFloat(metrics.umbilicalSkinfold || '0'),
        tricepsSkinfold: parseFloat(metrics.tricepsSkinfold || '0'),
        midaxillarySkinfold2: parseFloat(metrics.midaxillarySkinfold2 || '0'),
        subscapularSkinfold: parseFloat(metrics.subscapularSkinfold || '0'),
        calfSkinfold: parseFloat(metrics.calfSkinfold || '0'),
        gender: metrics.gender,
        unit: metrics.unit,
        activityLevel: metrics.activityLevel
      };

      // Calculate BMI
      const bmiResults = calculateBMI(numericMetrics, metrics.unit);

      // Calculate ideal weight
      const baseIdealWeight = calculateIdealWeight(numericMetrics.height, numericMetrics.gender);
      const idealWeightResults = {
        ...baseIdealWeight,
        athletic: 0, // Add missing properties
        bmiBased: 0
      };

      // Calculate biological age
      const biologicalAge = calculateBiologicalAge(numericMetrics);

      // Create complete results object
      const newResults = {
        bmi: bmiResults,
        idealWeight: idealWeightResults,
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