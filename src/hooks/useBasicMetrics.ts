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

    const numericMetrics: HealthMetrics = {
      ...metrics,
      height: parseFloat(metrics.height),
      weight: parseFloat(metrics.weight),
      age: parseFloat(metrics.age)
    };

    const bmiResults = calculateBMI(numericMetrics);
    const idealWeightResults = calculateIdealWeight(numericMetrics);
    const biologicalAge = calculateBiologicalAge(numericMetrics);

    // Ensure all required properties are included in idealWeightResults
    const completeIdealWeightResults = {
      ...idealWeightResults,
      athletic: idealWeightResults.athletic || 0,
      bmiBased: idealWeightResults.bmiBased || 0
    };

    const results = {
      bmi: bmiResults,
      idealWeight: completeIdealWeightResults,
      biologicalAge
    };

    console.log('Basic metrics calculated:', results);
    dispatch({ type: 'SET_RESULTS', results: { ...state.results, ...results } });
  }, [metrics.height, metrics.weight, metrics.age, metrics.gender, metrics.unit]);

  return state.results;
};