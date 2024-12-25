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
  
  let bodyFat: number;
  
  if (metrics.gender === 'male') {
    // Male formula with adult/child differentiation and BMI adjustment
    bodyFat = (1.20 * bmi) + (0.23 * age) - 16.2;
    
    // BMI adjustments for males
    if (bmi < 18.5) {
      bodyFat *= 0.95; // Underweight adjustment
    } else if (bmi > 30) {
      bodyFat *= 0.85; // Obesity adjustment
    }
  } else {
    // Female formula with adult/child differentiation and BMI adjustment
    bodyFat = (1.20 * bmi) + (0.23 * age) - 5.4;
    
    // BMI adjustments for females
    if (bmi < 18.5) {
      bodyFat *= 0.95; // Underweight adjustment
    } else if (bmi > 30) {
      bodyFat *= 0.85; // Obesity adjustment
    }
  }

  // Age-specific adjustments
  if (age < 18) {
    bodyFat *= 0.95; // Adolescent adjustment
  } else if (age > 50) {
    bodyFat *= 1.05; // Senior adjustment
  }

  // Ensure result is within realistic bounds
  bodyFat = Math.max(3, Math.min(bodyFat, 45));

  console.log('BMI-Based body fat calculation:', {
    bmi,
    age,
    gender: metrics.gender,
    result: bodyFat
  });

  return Math.round(bodyFat * 10) / 10; // Round to 1 decimal place
};