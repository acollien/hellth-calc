import { HealthMetrics } from '../types';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  console.log('Calculating BMI-based body fat with metrics:', metrics);
  
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const bmi = metrics.weight / Math.pow(metrics.height / 100, 2);
  
  return metrics.gender === 'male'
    ? (1.20 * bmi) + (0.23 * metrics.age) - 16.2
    : (1.20 * bmi) + (0.23 * metrics.age) - 5.4;
};