import { HealthMetrics } from '@/components/health/types';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const height = parseFloat(metrics.height);
  const weight = parseFloat(metrics.weight);
  const age = parseFloat(metrics.age);
  
  // Calculate BMI
  const bmi = weight / Math.pow(height / 100, 2);
  
  // Updated coefficients based on Deurenberg formula (1991)
  const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * (metrics.gender === 'male' ? 1 : 0)) - 5.4;

  // Ensure result is within realistic bounds
  return Math.max(0, Math.min(bodyFat, 100));
};