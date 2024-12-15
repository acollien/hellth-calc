import { HealthMetrics } from '@/components/health/types';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const height = Number(metrics.height);
  const weight = Number(metrics.weight);
  const age = Number(metrics.age);
  
  const bmi = weight / Math.pow(height / 100, 2);
  
  return metrics.gender === 'male'
    ? (1.20 * bmi) + (0.23 * age) - 10.8 - 5.4
    : (1.20 * bmi) + (0.23 * age) - 5.4;
};