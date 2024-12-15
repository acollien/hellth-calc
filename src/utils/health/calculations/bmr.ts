import { HealthMetrics } from '@/components/health/types';

export const calculateBMR = (metrics: HealthMetrics): number | null => {
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) {
    return null;
  }

  // Convert imperial to metric if needed
  const weight = metrics.unit === 'imperial' ? metrics.weight * 0.453592 : metrics.weight;
  const height = metrics.unit === 'imperial' ? metrics.height * 2.54 : metrics.height;

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * metrics.age);
  bmr = metrics.gender === 'male' ? bmr + 5 : bmr - 161;

  // Adjust BMR based on activity level
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  if (metrics.activityLevel && metrics.activityLevel !== '') {
    bmr *= activityMultipliers[metrics.activityLevel];
  }

  return Math.round(bmr);
};