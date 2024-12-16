import { HealthMetrics } from '@/components/health/types';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const height = parseFloat(metrics.height);
  const weight = parseFloat(metrics.weight);
  const age = parseFloat(metrics.age);
  
  const bmi = weight / Math.pow(height / 100, 2);
  
  const bodyFat = metrics.gender === 'male'
    ? (1.10 * bmi) + (0.15 * age) - 9.5
    : (1.08 * bmi) + (0.15 * age) - 4.5;

  return Math.max(0, Math.min(bodyFat, 100));
};