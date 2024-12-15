import { HealthMetrics } from '@/components/health/types';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const height = Number(metrics.height);
  const weight = Number(metrics.weight);
  const age = Number(metrics.age);
  
  // Calculate BMI
  const bmi = weight / Math.pow(height / 100, 2);
  
  // Updated coefficients based on more recent research for better alignment with other methods
  let bodyFat = metrics.gender === 'male'
    ? (1.10 * bmi) + (0.15 * age) - 9.5
    : (1.08 * bmi) + (0.15 * age) - 4.5;

  // Ensure result is within realistic bounds
  return Math.max(0, Math.min(bodyFat, 100));
};