import { HealthMetrics } from '@/components/health/types';

export const calculateLeanMassIndex = (metrics: HealthMetrics): number | null => {
  console.log('Calculating Lean Mass Index with metrics:', metrics);

  const { height, weight, bodyFat } = metrics;
  if (!height || !weight) {
    console.log('Missing required metrics for Lean Mass Index calculation');
    return null;
  }

  const heightInM = Number(height) / 100;
  const weightInKg = Number(weight);
  
  // Calculate lean mass using the most accurate available body fat percentage
  const bodyFatPercentage = bodyFat?.navy || bodyFat?.jackson || bodyFat?.bmiBased;
  
  if (!bodyFatPercentage) {
    console.log('No valid body fat percentage available for Lean Mass Index calculation');
    return null;
  }

  const leanMass = weightInKg * (1 - (bodyFatPercentage / 100));
  const leanMassIndex = leanMass / (heightInM * heightInM);

  console.log('Calculated Lean Mass Index:', leanMassIndex);
  return leanMassIndex;
};