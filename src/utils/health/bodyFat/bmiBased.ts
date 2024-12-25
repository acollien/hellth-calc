import { HealthMetrics } from '@/types/health';

export const calculateBMIBasedBodyFat = (metrics: HealthMetrics): number | null => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) {
    return null;
  }

  const height = parseFloat(metrics.height);
  const weight = parseFloat(metrics.weight);
  const age = parseFloat(metrics.age);
  
  // Calculate BMI
  const bmi = weight / Math.pow(height / 100, 2);
  
  // Deurenberg et al. (1991) equation
  const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * (metrics.gender === 'male' ? 1 : 0)) - 5.4;

  console.log('BMI-Based body fat calculation:', {
    bmi,
    age,
    gender: metrics.gender,
    result: bodyFat
  });

  return Math.round(bodyFat * 10) / 10; // Round to 1 decimal place
};