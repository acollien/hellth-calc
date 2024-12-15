import { HealthMetrics } from '@/components/health/types';
import { calculateBodyFat } from '../bodyFat';

export const calculateLeanMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Lean Mass Index with metrics:', metrics);

  const { height, weight } = metrics;
  if (!height || !weight) {
    console.log('Missing required metrics for Lean Mass Index calculation');
    return null;
  }

  const heightInM = Number(height) / 100;
  const weightInKg = Number(weight);
  
  // Convert metrics to the format expected by calculateBodyFat
  const convertedMetrics = {
    ...metrics,
    height: Number(height),
    weight: Number(weight),
    neck: metrics.neck ? Number(metrics.neck) : undefined,
    waist: metrics.waist ? Number(metrics.waist) : undefined,
    hip: metrics.hip ? Number(metrics.hip) : undefined
  };
  
  // Calculate body fat using the Navy method as it's generally most reliable
  const bodyFatResults = calculateBodyFat(convertedMetrics);
  const bodyFatPercentage = bodyFatResults?.navy || null;
  
  if (bodyFatPercentage === null) {
    console.log('No valid body fat percentage available for Lean Mass Index calculation');
    return null;
  }

  const leanMass = weightInKg * (1 - (bodyFatPercentage / 100));
  const leanMassIndex = leanMass / (heightInM * heightInM);

  console.log('Calculated Lean Mass Index:', leanMassIndex);
  return leanMassIndex;
};