import { HealthMetrics } from '@/types/health';
import { calculateBodyFat } from '../bodyFat';

export const calculateLeanMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Lean Mass Index with metrics:', metrics);

  const { height, weight } = metrics;
  if (!height || !weight) {
    console.log('Missing required metrics for Lean Mass Index calculation');
    return null;
  }

  const heightInM = parseFloat(height) / 100;
  const weightInKg = parseFloat(weight);
  
  const bodyFatResults = calculateBodyFat(metrics);
  const bodyFatPercentage = bodyFatResults?.navy || bodyFatResults?.jackson || bodyFatResults?.bmiBased || null;
  
  if (bodyFatPercentage === null) {
    console.log('No valid body fat percentage available for Lean Mass Index calculation');
    return null;
  }

  const leanMass = weightInKg * (1 - (bodyFatPercentage / 100));
  const leanMassIndex = leanMass / (heightInM * heightInM);

  console.log('Calculated Lean Mass Index:', leanMassIndex);
  return leanMassIndex;
};