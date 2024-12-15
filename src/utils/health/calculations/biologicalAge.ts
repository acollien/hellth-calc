import { HealthMetrics } from '../types';
import { calculateWaistToHeightRatio } from './waistToHeight';

export const calculateBiologicalAge = (metrics: HealthMetrics) => {
  if (!metrics.age || !metrics.weight || !metrics.height) return null;

  const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
  let bioAge = metrics.age;

  if (bmi > 25) bioAge += (bmi - 25) * 0.5;
  if (bmi < 18.5) bioAge += (18.5 - bmi) * 0.5;

  const whr = calculateWaistToHeightRatio(metrics.waist || 0, metrics.height);
  if (whr) {
    if (metrics.gender === 'male' && whr > 0.9) bioAge += (whr - 0.9) * 10;
    if (metrics.gender === 'female' && whr > 0.85) bioAge += (whr - 0.85) * 10;
  }

  return Math.round(bioAge);
};