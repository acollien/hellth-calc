import { HealthMetrics } from "@/components/health/types";

export const calculateBMR = (metrics: HealthMetrics) => {
  if (!metrics.height || !metrics.weight || !metrics.age || !metrics.gender) return null;

  const height = parseFloat(metrics.height);
  const weight = parseFloat(metrics.weight);
  const age = parseFloat(metrics.age);

  // Mifflin-St Jeor Equation
  const bmr = metrics.gender === 'male'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9
  };

  const tdee = metrics.activityLevel 
    ? bmr * activityMultipliers[metrics.activityLevel]
    : null;

  return { bmr, tdee };
};