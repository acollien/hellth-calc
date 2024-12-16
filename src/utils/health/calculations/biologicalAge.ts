import { HealthMetrics } from '@/components/health/types';
import { calculateWaistToHeightRatio } from './waistToHeight';

export const calculateBiologicalAge = (metrics: HealthMetrics): number | null => {
  if (!metrics.age || !metrics.weight || !metrics.height) return null;

  const height = parseFloat(metrics.height);
  const weight = parseFloat(metrics.weight);
  const age = parseFloat(metrics.age);

  const bmi = weight / Math.pow(height / 100, 2);
  let bioAge = age;

  if (bmi > 25) bioAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) bioAge += (18.5 - bmi) * 0.5;

  if (metrics.waist && metrics.height) {
    const whr = calculateWaistToHeightRatio(parseFloat(metrics.waist), height);
    if (whr) {
      if (metrics.gender === 'male' && whr > 0.9) bioAge += (whr - 0.9) * 10;
      if (metrics.gender === 'female' && whr > 0.85) bioAge += (whr - 0.85) * 10;
    }
  }

  return Math.round(bioAge);
};