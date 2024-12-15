import { HealthMetrics } from '@/components/health/types';

export const calculateBMR = (metrics: HealthMetrics) => {
  if (!metrics.weight || !metrics.height || !metrics.age || !metrics.gender) {
    return { bmr: 0 };
  }

  // Convert imperial to metric if needed and ensure numbers
  const weight = metrics.unit === 'imperial' ? Number(metrics.weight) * 0.453592 : Number(metrics.weight);
  const height = metrics.unit === 'imperial' ? Number(metrics.height) * 2.54 : Number(metrics.height);
  const age = Number(metrics.age);

  // Mifflin-St Jeor Equation
  let bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = metrics.gender === 'male' ? bmr + 5 : bmr - 161;

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  // Calculate TDEE if activity level is provided
  if (metrics.activityLevel && metrics.activityLevel in activityMultipliers) {
    const multiplier = activityMultipliers[metrics.activityLevel as keyof typeof activityMultipliers];
    const tdee = bmr * multiplier;
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    };
  }

  return {
    bmr: Math.round(bmr)
  };
};