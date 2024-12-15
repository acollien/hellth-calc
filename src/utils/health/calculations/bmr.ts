import { HealthMetrics } from '@/components/health/types';

export const calculateBMR = (metrics: HealthMetrics) => {
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) {
    return null;
  }

  // Convert imperial to metric if needed and ensure numbers
  const weight = Number(metrics.unit === 'imperial' ? Number(metrics.weight) * 0.453592 : metrics.weight);
  const height = Number(metrics.unit === 'imperial' ? Number(metrics.height) * 2.54 : metrics.height);
  const age = Number(metrics.age);

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = metrics.gender === 'male' ? bmr + 5 : bmr - 161;

  // Adjust BMR based on activity level
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  // Check if activityLevel exists and is not an empty string
  if (metrics.activityLevel && metrics.activityLevel in activityMultipliers) {
    const multiplier = activityMultipliers[metrics.activityLevel as keyof typeof activityMultipliers];
    return Math.round(bmr * multiplier);
  }

  return Math.round(bmr);
};