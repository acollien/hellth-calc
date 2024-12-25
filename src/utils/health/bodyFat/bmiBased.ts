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
  
  // Enhanced Deurenberg equation with additional precision factors
  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    // Male formula with adult/child differentiation
    if (age < 18) {
      bodyFat = (1.51 * bmi) - (0.70 * age) - 2.2;
    } else {
      bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
    }
  } else {
    // Female formula with adult/child differentiation
    if (age < 18) {
      bodyFat = (1.51 * bmi) - (0.70 * age) + 1.4;
    } else {
      bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
    }
  }

  // Adjust for extreme BMI values
  if (bmi < 18.5) {
    bodyFat *= 0.95; // Slight reduction for underweight individuals
  } else if (bmi > 30) {
    bodyFat *= 1.05; // Slight increase for obese individuals
  }

  console.log('BMI-Based body fat calculation:', {
    bmi,
    age,
    gender: metrics.gender,
    result: bodyFat
  });

  // Ensure result is within realistic bounds
  return Math.max(0, Math.min(bodyFat, 100));
};