import { HealthMetrics } from '@/types/health';
import { calculateBodyFat } from '../bodyFat';

export const calculateLeanMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Lean Mass Index with metrics:', metrics);

  if (!metrics.height || !metrics.weight || !metrics.gender) {
    console.log('Missing required metrics for Lean Mass Index calculation');
    return null;
  }

  const heightInM = parseFloat(metrics.height) / 100;
  const weightInKg = metrics.unit === 'imperial' ? 
    parseFloat(metrics.weight) * 0.453592 : 
    parseFloat(metrics.weight);
  
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