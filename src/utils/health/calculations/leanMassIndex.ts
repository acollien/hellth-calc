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
  
  // Convert all numeric string values to numbers
  const convertedMetrics = {
    height: Number(height),
    weight: Number(weight),
    age: metrics.age ? Number(metrics.age) : undefined,
    neck: metrics.neck ? Number(metrics.neck) : undefined,
    waist: metrics.waist ? Number(metrics.waist) : undefined,
    hip: metrics.hip ? Number(metrics.hip) : undefined,
    wrist: metrics.wrist ? Number(metrics.wrist) : undefined,
    forearm: metrics.forearm ? Number(metrics.forearm) : undefined,
    chestSkinfold: metrics.chestSkinfold ? Number(metrics.chestSkinfold) : undefined,
    midaxillarySkinfold: metrics.midaxillarySkinfold ? Number(metrics.midaxillarySkinfold) : undefined,
    suprailiacSkinfold: metrics.suprailiacSkinfold ? Number(metrics.suprailiacSkinfold) : undefined,
    thighSkinfold: metrics.thighSkinfold ? Number(metrics.thighSkinfold) : undefined,
    umbilicalSkinfold: metrics.umbilicalSkinfold ? Number(metrics.umbilicalSkinfold) : undefined,
    tricepsSkinfold: metrics.tricepsSkinfold ? Number(metrics.tricepsSkinfold) : undefined,
    subscapularSkinfold: metrics.subscapularSkinfold ? Number(metrics.subscapularSkinfold) : undefined,
    calfSkinfold: metrics.calfSkinfold ? Number(metrics.calfSkinfold) : undefined,
    midaxillarySkinfold2: metrics.midaxillarySkinfold2 ? Number(metrics.midaxillarySkinfold2) : undefined,
    gender: metrics.gender === 'male' || metrics.gender === 'female' ? metrics.gender : undefined,
    activityLevel: metrics.activityLevel === '' ? undefined : metrics.activityLevel,
    unit: metrics.unit
  };
  
  const bodyFatResults = calculateBodyFat(convertedMetrics);
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